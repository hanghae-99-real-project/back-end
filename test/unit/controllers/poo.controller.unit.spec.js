const PooController = require("@controllers/poo.controller");


// poo.controller.js 에서는 아래 5개의 Method만을 사용합니다.
let mockPooService = {
    postPoo: jest.fn(),
    findAllPoo: jest.fn()
};

let mockRequest = {
    params: jest.fn(),
    body: jest.fn(),
};

let mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
    locals: {
        userId: 1
    },
};

let mockNext = jest.fn();

let pooController = new PooController();
// postsController의 Service를 Mock Service로 변경합니다.
pooController.pooService = mockPooService;

describe('푸박스 컨트롤러 유닛 테스트', () => {
    // 각 test가 실행되기 전에 실행됩니다.
    beforeEach(() => {
        jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

        // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
        mockResponse.status = jest.fn(() => {
            return mockResponse;
        });
    });

    test('푸박스 컨트롤러 postPoo 메소드 유닛 테스트 성공케이스 테스트', async () => {
        const postPooRequestBody = {
            content: "여기가 똥통",
            pooLatitude: "37.5652352",
            pooLongitude: "127.0284288",
            pooPhotoUrl: "대충 url"
        };
        const postPooRequestParams = {
            pooId: 5,
        };

        const postPooResLocals = {
            userId: 1,
        };

        mockRequest.body = postPooRequestBody;
        mockRequest.params = postPooRequestParams;
        mockResponse.locals.user = postPooResLocals;

        const postPooReturnValue = { message: "푸박스 등록 완료" };

        mockPooService.distanceBetweenPooLocation = jest.fn(() => {
            return {
                message: "위경도 변환",
            };
        });

        mockPooService.postPoo = jest.fn(() => {
            return postPooReturnValue;
        });


        await pooController.postPoo(mockRequest, mockResponse);

        //req
        expect(mockPooService.distanceBetweenPooLocation).toHaveBeenCalledTimes(1);
        expect(mockPooService.postPoo).toHaveBeenCalledTimes(1);
        expect(mockPooService.postPoo).toHaveBeenCalledWith(postPooRequestBody);

        //res
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);

        expect(mockResponse.json).toHaveBeenCalledWith({
            postPooReturnValue
        });
    });

    test('푸박스 컨트롤러 findAllPoo 메소드 유닛 테스트 성공케이스 테스트', async () => {

        // PostService의 createPost의 Return 값을 설정하는 변수입니다.
        const findAllPooReturnValue = {
            getPooAll: [
                {
                    pooId: 1,
                    UserId: 9,
                    content: "ㅇㅁ",
                    pooPhotoUrl: "대충 이미지 url",
                    pooLatitude: "37.56551583208476",
                    pooLongitude: "127.03017607753534",
                    address: "대충 주소",
                    createdAt: new Date().toString(),
                    updatedAt: new Date().toString(),
                }, {
                    pooId: 2,
                    UserId: 10,
                    content: "ㅇㅁ",
                    pooPhotoUrl: "대충 이미지 url",
                    pooLatitude: "37.56551583208476",
                    pooLongitude: "127.03017607753534",
                    address: "대충 주소",
                    createdAt: new Date().toString(),
                    updatedAt: new Date().toString(),
                }
            ]
        }


        // PostService.createPost Method의 Return 값을 createPostReturnValue 변수로 설정합니다.
        mockPooService.findAllPoo = jest.fn(() => findAllPooReturnValue);

        // PostsController의 createPost Method를 실행합니다.
        await pooController.findAllPoo(mockRequest, mockResponse);

        /** PostsController.createPost 성공 케이스 **/
        // 1. req.body에 들어있는 값을 바탕으로 PostService.cretePost가 호출됩니다.
        // 2. res.status는 1번 호출되고, 201의 값으로 호출됩니다.
        // 3. PostService.cretePost에서 반환된 createPostData 변수를 이용해 res.json Method가 호출됩니다.

        // 1. req.body에 들어있는 값을 바탕으로 PostService.cretePost가 호출됩니다.
        expect(mockPooService.findAllPoo).toHaveBeenCalledTimes(1);

        // 2. res.status는 1번 호출되고, 201의 값으로 호출됩니다.
        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);

        // 3. PostService.cretePost에서 반환된 createPostData 변수를 이용해 res.json Method가 호출됩니다.
        expect(mockResponse.json).toHaveBeenCalledWith({
            findAllPooReturnValue
        });
    });


});