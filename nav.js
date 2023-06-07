var map;
var marker_s, marker_e, marker_p1, marker_p2;
var totalMarkerArr = [];
var drawInfoArr = [];
var resultdrawArr = [];


//navigation주소로 get요청을 보냇을떄 (길찾기 버튼을 눌렀을때) 소켓이 연결되고 네비게이션 실행
//
function initTmap() {

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const location = {
            latitude,
            longitude,
        };
        sendmessage(location);
    })

    const socket = io.connect("http://localhost:3000/navigation", {
        path: "/socket.io",
        transports: ["websocket"],
    });




    function sendmessage(location) {
        socket.emit("send location", location);
    }

    // socket.interval = setInterval(() => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         const latitude = position.coords.latitude;
    //         const longitude = position.coords.longitude;
    //         const location = {
    //             latitude,
    //             longitude,
    //         };
    //         //위도,경도를 5초 마다 주기적으로 서버로 전송
    //         sendmessage(location);
    //     });
    // }, 5000);

    var startY;
    var startX;

    socket.on("receive location", (location) => {
        console.log(location.latitude, location.longitude);
        startY = location.latitude.toString();
        startX = location.longitude.toString();

        if (!map) {
            map = new Tmapv2.Map("map_div", {
                center: new Tmapv2.LatLng(startY, startX),
                width: "100%",
                height: "100vh",
                zoom: 17,
                zoomControl: true,
                scrollwheel: true,
            });
        }

        if (!marker_s) {
            marker_s = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(
                    parseFloat(startY),
                    parseFloat(startX)
                ),
                icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
                iconSize: new Tmapv2.Size(24, 38),
                map: map,
            });
        } else {
            marker_s.setPosition(
                new Tmapv2.LatLng(parseFloat(startY), parseFloat(startX))
            );
        }

        // 3. 경로탐색 API 사용요청
        var headers = {};
        headers["appKey"] = process.env.TMAP_API_KEY;

        // var startY = "37.3918226"; // 위도
        // var startX = "126.6617672"; // 경도

        var endY = "37.3918226";
        var endX = "126.6317672";

        $.ajax({
            method: "POST",
            headers: headers,
            url: "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
            async: false,
            data: {
                startX: startX,
                startY: startY,
                endX: endX,
                endY: endY,
                reqCoordType: "WGS84GEO",
                resCoordType: "EPSG3857",
                startName: "출발지",
                endName: "도착지",
            },
            success: function (response) {
                var resultData = response.features;

                // 2. 시작, 도착 심볼찍기
                // 시작
                marker_s = new Tmapv2.Marker({
                    position: new Tmapv2.LatLng(
                        parseFloat(startY),
                        parseFloat(startX)
                    ),
                    icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
                    iconSize: new Tmapv2.Size(24, 38),
                    map: map,
                });

                // 도착
                marker_e = new Tmapv2.Marker({
                    position: new Tmapv2.LatLng(parseFloat(endY), parseFloat(endX)),
                    icon: "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
                    iconSize: new Tmapv2.Size(24, 38),
                    map: map,
                });
                //결과 출력
                var tDistance =
                    "총 거리 : " +
                    (resultData[0].properties.totalDistance / 1000).toFixed(1) +
                    "km,";
                var tTime =
                    " 예상 소요 시간 : " +
                    (resultData[0].properties.totalTime / 60).toFixed(0) +
                    "분";
                $("#result").text(tDistance + tTime);

                //기존 그려진 라인 & 마커가 있다면 초기화
                if (resultdrawArr.length > 0) {
                    for (var i in resultdrawArr) {
                        resultdrawArr[i].setMap(null);
                    }
                    resultdrawArr = [];
                }

                drawInfoArr = [];

                for (var i in resultData) {
                    //for문 [S]
                    var geometry = resultData[i].geometry;
                    var properties = resultData[i].properties;
                    var polyline_;

                    if (geometry.type == "LineString") {
                        for (var j in geometry.coordinates) {
                            // 경로들의 결과값(구간)들을 포인트 객체로 변환
                            var latlng = new Tmapv2.Point(
                                geometry.coordinates[j][0],
                                geometry.coordinates[j][1]
                            );
                            // 포인트 객체를 받아 좌표값으로 변환
                            var convertPoint =
                                new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                            // 포인트객체의 정보로 좌표값 변환 객체로 저장
                            var convertChange = new Tmapv2.LatLng(
                                convertPoint._lat,
                                convertPoint._lng
                            );
                            // 배열에 담기
                            drawInfoArr.push(convertChange);
                        }
                    } else {
                        var markerImg = "";
                        var pType = "";
                        var size;

                        if (properties.pointType == "S") {
                            //출발지 마커
                            markerImg =
                                "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";
                            pType = "S";
                            size = new Tmapv2.Size(24, 38);
                        } else if (properties.pointType == "E") {
                            //도착지 마커
                            markerImg =
                                "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
                            pType = "E";
                            size = new Tmapv2.Size(24, 38);
                        } else {
                            //각 포인트 마커
                            markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                            pType = "P";
                            size = new Tmapv2.Size(8, 8);
                        }

                        // 경로들의 결과값들을 포인트 객체로 변환
                        var latlon = new Tmapv2.Point(
                            geometry.coordinates[0],
                            geometry.coordinates[1]
                        );

                        // 포인트 객체를 받아 좌표값으로 다시 변환
                        var convertPoint =
                            new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

                        var routeInfoObj = {
                            markerImage: markerImg,
                            lng: convertPoint._lng,
                            lat: convertPoint._lat,
                            pointType: pType,
                        };

                        // Marker 추가
                        marker_p = new Tmapv2.Marker({
                            position: new Tmapv2.LatLng(
                                routeInfoObj.lat,
                                routeInfoObj.lng
                            ),
                            icon: routeInfoObj.markerImage,
                            iconSize: size,
                            map: map,
                        });
                    }
                } //for문 [E]
                drawLine(drawInfoArr);
            },
            error: function (request, status, error) {
                console.log(
                    "code:" +
                    request.status +
                    "\n" +
                    "message:" +
                    request.responseText +
                    "\n" +
                    "error:" +
                    error
                );
            },
        });
    });
    // socket.on("receive location", (location) => {
    //   console.log(location.latitude, location.longitude);
    // });
}

function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
}

function drawLine(arrPoint) {
    var polyline_;

    polyline_ = new Tmapv2.Polyline({
        path: arrPoint,
        strokeColor: "#DD0000",
        strokeWeight: 6,
        map: map,
    });
    resultdrawArr.push(polyline_);
}

