const PoosRepository = require("@repositories/poo.repository");
const UsersRepository = require("@repositories/Users.repository");


// 가상 모델 생성
let mockPoosModel = {
    create: jest.fn(),
    findAll: jest.fn()
};


let redisClient = {
    setEx: jest.fn()
}

let mockUsersModel = {
    create: jest.fn(),
    findAll: jest.fn()
}

let poosRepository = new PoosRepository(mockPoosModel, redisClient);
let usersRepository = new UsersRepository(mockUsersModel);

describe("푸박스 CRUD 유닛테스트", () => {
    beforeEach(() => {
        // 모든 Mock을 초기화합니다.
        jest.resetAllMocks();
    });

    test("푸박스 등록 성공 케이스", async () => {
        mockPoosModel.create = jest.fn(() => {
            return { "msg": "푸박스등록이 완료되었습니다." }
        });
        const PoosBody = {
            UserId: 1,
            content: "대충 컨텐츠",
            pooPhotoUrl: "https://karyl.s3.ap-northeast-2.amazonaws.com/folder/2023-6-18-7-15-44_4371853",
            pooLatitude: 36.458651,
            pooLongitude: 126.756574,
            address: "대충 주소",
        };

        const postPooData = await poosRepository.postPoo(
            PoosBody.UserId,
            PoosBody.content,
            PoosBody.pooPhotoUrl,
            PoosBody.pooLatitude,
            PoosBody.pooLongitude,
            PoosBody.address
        );

        expect(mockPoosModel.create).toHaveBeenCalledTimes(1);
        expect(postPooData).toEqual({ "msg": "푸박스등록이 완료되었습니다." });
        expect(mockPoosModel.create).toHaveBeenCalledWith({
            UserId: PoosBody.UserId,
            content: PoosBody.content,
            pooPhotoUrl: PoosBody.pooPhotoUrl,
            pooLatitude: PoosBody.pooLatitude,
            pooLongitude: PoosBody.pooLongitude,
            address: PoosBody.address,
        });
    });


    test("푸박스 조회 성공 케이스", async () => {
        const findAllData = [
            {
                "pooId": 1,
                "UserId": 1,
                "pooLatitude": 37.5666322352345,
                "pooLongitude": 126.97872343563453,
                "content": "맛있어요",
                "pooPhotoUrl":
                    "https://karyl.s3.ap-northeast-2.amazonaws.com/folder/2023-5-27-11-6-25_8599185",
                "address": "서울시 마포구 동교로 49길 9",
                "createdAt": new Date("2023-05-23"),
                "updatedAt": new Date("2023-05-23")
            }
        ];

        mockPoosModel.findAll = jest.fn(() => {
            return findAllData;
        });

        const result = await poosRepository.findAllPoo();

        expect(mockPoosModel.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(findAllData);
        expect(mockPoosModel.findAll).toHaveBeenCalledWith({
            include: [
                {
                    model: mockUsersModel, // 사용자 모델을 모의(mock)한 모델로 변경해야 함
                    attributes: ['userId'],
                },
            ],
            order: [["createdAt", "DESC"]],
        });
    });

    test("두 위치 사이의 거리를 미터 단위로 계산", async () => {
        const mockFindAll = jest.fn(() => {
            return "거리계산";
        });

        poosRepository.PoosModel.findAll = mockFindAll;

        const latitude = 36.1568;
        const longitude = 126.4568;

        const nearbyPoos = await poosRepository.distanceBetweenPooLocation(latitude, longitude);


        expect(mockFindAll).toHaveBeenCalledTimes(1);
        expect(mockFindAll).toHaveBeenCalledWith({
            where: {
                [poosRepository.Sequelize.literal]: `ST_Distance_Sphere(point(${longitude}, ${latitude}), point(pooLongitude, pooLatitude)) <= 30`
            }
        });
        expect(nearbyPoos).toEqual("거리계산");
    });


});