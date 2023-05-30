const ReportPooService = require("../(2)services/reportPoo.service.js");

class ReportPooController {
    reportPooService = new ReportPooService();

    postReportPoo = async (req, res, next) => {
        const { userId } = res.locals.user;
        const { pooId } = req.params;
        const { reportContent } = req.body;

        const reportPoo = await this.reportPooService.postReportPoo(userId, pooId, reportContent)

        res.status(201).json(reportPoo)
    };
};

module.exports = ReportPooController