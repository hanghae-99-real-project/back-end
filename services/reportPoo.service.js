const ReportPooRepository = require("../repositories/reportPoo.repository");
const { ReportPoos, Poos } = require("../models");

class ReportPooService {
    reportPooRepository = new ReportPooRepository(ReportPoos, Poos);

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
                    if (findOneReportPoo.reportCount >= 5) {
                        await this.reportPooRepository.destroyPoo(pooId);
                        return { msg: "게시글삭제 완료" };
                    }
                }

                return { msg: "신고 완료" };
            } else {
                await this.reportPooRepository.destroyReportPoo(userId, pooId);
                return { msg: "신고 취소" };
            }
        } catch (error) {
            error.failedApi = "신고 실패";
            throw error;
        }
    };
}
module.exports = ReportPooService;