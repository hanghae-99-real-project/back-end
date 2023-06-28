const ReportPooRepository = require("@repositories/reportPoo.repository");
const PooRepository = require("@repositories/poo.repository");
const { ReportPoos, Poos } = require("@models");
const redisClient = require("@modules/redisClient")
const DEFAULT_EXPIRATION = 3600


class ReportPooService {
    reportPooRepository = new ReportPooRepository(ReportPoos, Poos);
    poosRepository = new PooRepository()

    // 신고 5회 이상 시 poo 게시글 삭제
    postReportPoo = async (userId, pooId, reportContent) => {
        try {
            const findOneReport = await this.reportPooRepository.findOneReport(
                userId,
                pooId
            );
            if (!findOneReport) {
                await this.reportPooRepository.postReportPoo(
                    userId,
                    pooId,
                    reportContent
                );
                const findOneReportPoo = await this.reportPooRepository.findOneReportPoo(pooId);

                if (findOneReportPoo) {
                    await this.reportPooRepository.incrementReportCount(findOneReportPoo);
                    if (findOneReportPoo.reportCount === 5) {
                        await this.reportPooRepository.destroyPoo(pooId);
                        const getPooAll = await this.poosRepository.findAllPoo()
                        await this.poosRepository.cashingPoo("api/map/poo", DEFAULT_EXPIRATION, getPooAll)
                        return { msg: "게시글삭제 완료" };
                    }
                }

                return { msg: "신고 완료" };
            } else {
                await this.reportPooRepository.destroyReportPoo(userId, pooId);
                return { msg: "신고 취소" };
            }
        } catch (error) {
            error.failedApi = "게시글 신고";
            throw error;
        }
    };
}
module.exports = ReportPooService;