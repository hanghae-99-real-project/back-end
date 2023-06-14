const ReportPooService = require("../services/reportPoo.service.js");

class ReportPooController {
    reportPooService = new ReportPooService();

    // 신고 5회 이상 시 poo 게시글 삭제
    postReportPoo = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { pooId } = req.params;
        const { reportContent } = req.body;
        const postReportPoo = await this.reportPooService.postReportPoo(userId, pooId, reportContent)
        return res.status(200).json(postReportPoo)
    };
}
module.exports = ReportPooController