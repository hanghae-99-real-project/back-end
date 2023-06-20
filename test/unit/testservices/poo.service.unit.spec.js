const pooService = require("@services/poo.service");

let mockPooRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
    getOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

let mockWorldcupChoicesRepository = {
    createChoice: jest.fn(),
    findAllWorldcupChoices: jest.fn(),
};

let worldcupService = new WorldcupService();
worldcupService.worldcupRepository = mockWorldcupRepository;
worldcupService.worldcupChoicesRepository = mockWorldcupChoicesRepository;

describe("Worldcup Service 단위 테스트", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    /** createWorldcup의 비즈니스 로직**/
    // 1. body 데이터로 가져온 값들을 Worldcups table에 추가합니다. (worldcupRepository.create(user_id, title, content))
    // 2. worldcup_id를 가져옵니다.
    // 3. 각 choice들을 Worldcup_choices table에 추가합니다. (worldcupChoicesRepository.createChoice(worldcup_id, choice.choice_name, choice.choice_url))

    test("Worldcup Service createWorldcup 성공 케이스", async () => {
        const createWorldcupReturnValue = {
            title: "타이틀 테스트",
            content: "컨텐트 테스트",
            user_id: 1,
            worldcup_id: 1,
            choices: [
                { choice_name: "A", choice_url: "http://example.com.jpg" },
                { choice_name: "B", choice_url: "http://example.com.jpg" },
            ],
        };

        mockWorldcupRepository.create = jest.fn(() => ({
            dataValues: { worldcup_id: 1 },
        }));

        const createdWorldcup = await worldcupService.createWorldcup(
            createWorldcupReturnValue.user_id,
            createWorldcupReturnValue.title,
            createWorldcupReturnValue.content,
            createWorldcupReturnValue.choices
        );

        expect(createdWorldcup).toEqual(createWorldcupReturnValue);

        expect(mockWorldcupRepository.create).toHaveBeenCalledTimes(1);
        expect(mockWorldcupChoicesRepository.createChoice).toHaveBeenCalledTimes(2);
    });

    /** getAllWorldcups의 비즈니스 로직 **/
    // 1. Worldcups table을 전체 순회하며 데이터를 가져옵니다. (worldcupRepository.getAll())
    // 2. 찾은 게시글이 없을 때, Error가 발생합니다. ("월드컵 게시물이 존재하지 않습니다.");
    // 3. 1번에서 얻은 전체 월드컵을 map으로 순회하면서 choices 내의 object를 반환하고 return할 object에 추가해줍니다.. (worldcupChoicesRepository.findAllWorldcupChoices(worldcup_id))

    test("Worldcup Service getAllWorldcups 성공 케이스", async () => {
        const getAllFuncReturnValue = [
            {
                dataValues: {
                    worldcup_id: 1,
                    user_id: 1,
                    nickname: "test1",
                    title: "타이틀 테스트1",
                    content: "컨텐트 테스트1",
                    likes: 1,
                    play_count: 10,
                    createdAt: "2023-05-08T15:52:03.000Z",
                    updatedAt: "2023-05-08T15:52:03.000Z",
                },
            },
            {
                dataValues: {
                    worldcup_id: 2,
                    user_id: 2,
                    nickname: "test2",
                    title: "타이틀 테스트2",
                    content: "컨텐트 테스트2",
                    likes: 3,
                    play_count: 7,
                    createdAt: "2023-05-08T15:52:03.000Z",
                    updatedAt: "2023-05-08T15:52:03.000Z",
                },
            },
        ];

        const choices = [
            { choice_name: "A", choice_url: "http://example.com.jpg" },
            { choice_name: "B", choice_url: "http://example.com.jpg" },
        ];

        mockWorldcupRepository.getAll = jest.fn(() => getAllFuncReturnValue);
        mockWorldcupChoicesRepository.findAllWorldcupChoices = jest
            .fn()
            .mockImplementation(() => choices.map((choice) => choice));

        const allWorldcups = await worldcupService.getAllWorldcups();
        expect(mockWorldcupRepository.getAll).toHaveBeenCalledTimes(1);
        expect(
            mockWorldcupChoicesRepository.findAllWorldcupChoices
        ).toHaveBeenCalledWith(1);
        expect(
            mockWorldcupChoicesRepository.findAllWorldcupChoices
        ).toHaveBeenCalledWith(2);

        const getAllWorldcupsReturnValue = getAllFuncReturnValue.map(
            (worldcup) => ({
                worldcup_id: worldcup.dataValues.worldcup_id,
                user_id: worldcup.dataValues.user_id,
                nickname: worldcup.dataValues.nickname,
                title: worldcup.dataValues.title,
                content: worldcup.dataValues.content,
                likes: worldcup.dataValues.likes,
                play_count: worldcup.dataValues.play_count,
                createdAt: worldcup.dataValues.createdAt,
                updatedAt: worldcup.dataValues.updatedAt,
                choices,
            })
        );
        expect(allWorldcups).toMatchObject(getAllWorldcupsReturnValue);
    });

    test("Worldcup Service getAllWorldcups 실패 케이스", async () => {
        const getAllWorldcupsReturnValue = [];

        mockWorldcupRepository.getAll = jest.fn(() => getAllWorldcupsReturnValue);

        try {
            const allWorldcups = await worldcupService.getAllWorldcups();
        } catch (error) {
            // 1. Worldcups table을 전체 순회하며 데이터를 가져옵니다. (worldcupRepository.getAll())
            expect(mockWorldcupRepository.getAll).toHaveBeenCalledTimes(1);

            // 2. 찾은 게시글이 없을 때, Error가 발생합니다. ("월드컵 게시물이 존재하지 않습니다.");
            expect(error.message).toEqual("월드컵 게시물이 존재하지 않습니다.");
        }
    });

    /** getOneWorldcup의 비즈니스 로직 **/
    // 1. Worldcups table을 전체 순회하며 worldcup_id에 해당하는 데이터를 가져옵니다. (worldcupRepository.getOne(worldcup_id))
    // 2. 찾은 게시글이 없을 때, Error가 발생합니다. ("월드컵 게시물이 존재하지 않습니다.");
    // 3. 1번에서 얻은 월드컵을 map으로 순회하면서 choices 내의 object를 반환하고 return할 object에 추가해줍니다.

    test("Worldcup Service getOneWorldcup 성공 케이스", async () => {
        const choices = [
            { choice_name: "A", choice_url: "http://example.com.jpg" },
            { choice_name: "B", choice_url: "http://example.com.jpg" },
        ];
        const worldcup = {
            dataValues: {
                worldcup_id: 1,
                user_id: 1,
                nickname: "test1",
                title: "타이틀 테스트1",
                content: "컨텐트 테스트1",
                likes: 1,
                play_count: 10,
                createdAt: "2023-05-08T15:52:03.000Z",
                updatedAt: "2023-05-08T15:52:03.000Z",
            },
        };

        const getOneWorldcupReturnValue = {
            worldcup_id: 1,
            user_id: 1,
            nickname: "test1",
            title: "타이틀 테스트1",
            content: "컨텐트 테스트1",
            likes: 1,
            play_count: 10,
            createdAt: "2023-05-08T15:52:03.000Z",
            updatedAt: "2023-05-08T15:52:03.000Z",
            choices,
        };

        const worldcup_id = worldcup.dataValues.worldcup_id;

        mockWorldcupRepository.getOne = jest.fn(() => ({
            ...worldcup,
            Worldcup_choices: choices,
        }));

        const oneWorldcup = await worldcupService.getOneWorldcup(worldcup_id);

        expect(mockWorldcupRepository.getOne).toHaveBeenCalledTimes(1);
        expect(oneWorldcup).toMatchObject(getOneWorldcupReturnValue);
    });

    test("Worldcup Service getOneWorldcup 실패 케이스", async () => {
        const getOneWorldcupReturnValue = null;

        mockWorldcupRepository.getOne = jest.fn(() => getOneWorldcupReturnValue);

        try {
            const worldcup_id = 1;
            const worldcup = await worldcupService.getOneWorldcup(worldcup_id);
        } catch (error) {
            // 1. Worldcups table을 전체 순회하며 worldcup_id에 해당하는 데이터를 가져옵니다. (worldcupRepository.getOne(worldcup_id))
            expect(mockWorldcupRepository.getOne).toHaveBeenCalledTimes(1);

            // 2. 찾은 게시글이 없을 때, Error가 발생합니다. ("월드컵 게시물이 존재하지 않습니다.");
            expect(error.message).toEqual("월드컵 게시물이 존재하지 않습니다.");
        }
    });

    /** updateWorldcup의 비즈니스 로직 **/
    // 1. Worldcups table을 전체 순회하며 worldcup_id에 해당하는 데이터를 가져옵니다. (worldcupRepository.getOne(worldcup_id))
    // 2. 찾은 게시글이 없을 때, Error가 발생합니다. ("월드컵 게시물이 존재하지 않습니다.");
    // 3. 찾은 게시글의 user_id와 param으로 받아온 user_id가 다를 경우, Error가 발생합니다. ("월드컵 게시물 수정 권한이 없습니다.");
    // 4. body 데이터로 받아온 제목과 내용을 update합니다. (worldcupRepository.update(title, content, worldcup_id, user_id))

    test("Worldcup Service updateWorldcup 성공 케이스", async () => {
        const updateWorldcupParams = {
            title: "updatingtitle",
            content: "updatingcontent",
            worldcup_id: 1,
            user_id: 1,
        };

        const getWorldcupByIdReturnValue = {
            worldcup_id: updateWorldcupParams.worldcup_id,
            user_id: updateWorldcupParams.user_id,
            nickname: "test1",
            title: "타이틀 테스트1",
            content: "컨텐트 테스트1",
            likes: 1,
            play_count: 10,
            createdAt: "2023-05-08T15:52:03.000Z",
            updatedAt: "2023-05-08T15:52:03.000Z",
            choices: [
                { choice_name: "A", choice_url: "http://example.com.jpg" },
                { choice_name: "B", choice_url: "http://example.com.jpg" },
            ],
        };

        mockWorldcupRepository.getOne = jest.fn(() => getWorldcupByIdReturnValue);

        const updatedWorldcup = await worldcupService.updateWorldcup(
            updateWorldcupParams.title,
            updateWorldcupParams.content,
            updateWorldcupParams.worldcup_id,
            updateWorldcupParams.user_id
        );

        expect(mockWorldcupRepository.getOne).toHaveBeenCalledTimes(1);
        expect(mockWorldcupRepository.getOne).toHaveBeenCalledWith(
            updateWorldcupParams.worldcup_id
        );

        expect(mockWorldcupRepository.update).toHaveBeenCalledTimes(1);
        expect(mockWorldcupRepository.update).toHaveBeenCalledWith(
            updateWorldcupParams.title,
            updateWorldcupParams.content,
            updateWorldcupParams.worldcup_id,
            updateWorldcupParams.user_id
        );

        expect(updatedWorldcup).toMatchObject({
            worldcup_id: updateWorldcupParams.worldcup_id,
            user_id: updateWorldcupParams.user_id,
            title: updateWorldcupParams.title,
            content: updateWorldcupParams.content,
        });
    });

    test("Worldcup Service updateWorldcup 실패 케이스 - 게시물이 존재하지 않는 경우", async () => {
        // 2. 찾은 게시글이 없을 때, Error가 발생합니다. ("월드컵 게시물이 존재하지 않습니다.");
        const worldcupParams = {
            title: "updatingtitle",
            content: "updatingcontent",
            worldcup_id: 2,
            user_id: 1,
        };
        const getOneWorldcupWithNull = null;
        mockWorldcupRepository.getOne = jest.fn(() => getOneWorldcupWithNull);
        try {
            const worldcup = await worldcupService.updateWorldcup(
                worldcupParams.worldcup_id
            );
        } catch (error) {
            expect(mockWorldcupRepository.getOne).toHaveBeenCalledTimes(1);
            expect(error.message).toEqual("월드컵 게시물이 존재하지 않습니다.");
        }
    });

    test("Worldcup Service updateWorldcup 실패 케이스 - 게시물 수정 권한이 없는 경우", async () => {
        // 3. 찾은 게시글의 user_id와 param으로 받아온 user_id가 다를 경우, Error가 발생합니다. ("월드컵 게시물 수정 권한이 없습니다.");
        const worldcupParams = {
            title: "updatingtitle",
            content: "updatingcontent",
            worldcup_id: 1,
            user_id: 2,
        };
        const getOneWorldcupWithDifferentUserId = {
            worldcup_id: worldcupParams.worldcup_id,
            user_id: 1,
        };
        mockWorldcupRepository.getOne = jest.fn(
            () => getOneWorldcupWithDifferentUserId
        );
        try {
            const worldcup = await worldcupService.updateWorldcup(
                worldcupParams.worldcup_id
            );
        } catch (error) {
            expect(mockWorldcupRepository.getOne).toHaveBeenCalledTimes(1);
            expect(error.message).toEqual("월드컵 게시물 수정 권한이 없습니다.");
        }
    });

    /** deleteWorldcup의 비즈니스 로직 **/
    // 1. Worldcups table을 전체 순회하며 worldcup_id에 해당하는 데이터를 가져옵니다. (worldcupRepository.getOne(worldcup_id))
    // 2. 찾은 게시글이 없을 때, Error가 발생합니다. ("월드컵 게시물이 존재하지 않습니다.");
    // 3. 찾은 게시글의 user_id와 param으로 받아온 user_id가 다를 경우, Error가 발생합니다. ("월드컵 게시물 수정 권한이 없습니다.");
    // 4. 해당 월드컵을 삭제해줍니다. (worldcupRepository.remove(worldcup_id, user_id))
    test("Worldcup Service deleteWorldcup 성공 케이스", async () => {
        const deleteWorldcupParams = {
            worldcup_id: 1,
            user_id: 1,
        };

        const getWorldcupByIdReturnValue = {
            worldcup_id: deleteWorldcupParams.worldcup_id,
            user_id: deleteWorldcupParams.user_id,
            nickname: "test1",
            title: "타이틀 테스트1",
            content: "컨텐트 테스트1",
            likes: 1,
            play_count: 10,
            createdAt: "2023-05-08T15:52:03.000Z",
            updatedAt: "2023-05-08T15:52:03.000Z",
            choices: [
                { choice_name: "A", choice_url: "http://example.com.jpg" },
                { choice_name: "B", choice_url: "http://example.com.jpg" },
            ],
        };

        mockWorldcupRepository.getOne = jest.fn(() => getWorldcupByIdReturnValue);

        await worldcupService.deleteWorldcup(
            deleteWorldcupParams.worldcup_id,
            deleteWorldcupParams.user_id
        );

        expect(mockWorldcupRepository.getOne).toHaveBeenCalledTimes(1);
        expect(mockWorldcupRepository.getOne).toHaveBeenCalledWith(
            deleteWorldcupParams.worldcup_id
        );

        expect(mockWorldcupRepository.remove).toHaveBeenCalledTimes(1);
        expect(mockWorldcupRepository.remove).toHaveBeenCalledWith(
            deleteWorldcupParams.worldcup_id,
            deleteWorldcupParams.user_id
        );
    });

    test("Worldcup Service deleteWorldcup 실패 케이스 - 게시물이 존재하지 않는 경우", async () => {
        // 2. 찾은 게시글이 없을 때, Error가 발생합니다. ("월드컵 게시물이 존재하지 않습니다.");
        const worldcupParams = {
            worldcup_id: 2,
            user_id: 1,
        };
        const getOneWorldcupWithNull = null;
        mockWorldcupRepository.getOne = jest.fn(() => getOneWorldcupWithNull);
        try {
            const worldcup = await worldcupService.deleteWorldcup(
                worldcupParams.worldcup_id
            );
        } catch (error) {
            expect(mockWorldcupRepository.getOne).toHaveBeenCalledTimes(1);
            expect(error.message).toEqual("월드컵 게시물이 존재하지 않습니다.");
        }
    });

    test("Worldcup Service deleteWorldcup 실패 케이스 - 게시물 수정 권한이 없는 경우", async () => {
        // 3. 찾은 게시글의 user_id와 param으로 받아온 user_id가 다를 경우, Error가 발생합니다. ("월드컵 게시물 수정 권한이 없습니다.");
        const worldcupParams = {
            worldcup_id: 1,
            user_id: 2,
        };
        const getOneWorldcupWithDifferentUserId = {
            worldcup_id: worldcupParams.worldcup_id,
            user_id: 1,
        };
        mockWorldcupRepository.getOne = jest.fn(
            () => getOneWorldcupWithDifferentUserId
        );
        try {
            const worldcup = await worldcupService.deleteWorldcup(
                worldcupParams.worldcup_id
            );
        } catch (error) {
            expect(mockWorldcupRepository.getOne).toHaveBeenCalledTimes(1);
            expect(error.message).toEqual("월드컵 게시물 삭제 권한이 없습니다.");
        }
    });
});