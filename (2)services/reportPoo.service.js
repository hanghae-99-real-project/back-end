const ReportPooRepository = require("../(3)repositories/reportPoo.repository");
const { ReportPoos } = require("../models");

class ReportPooService {
    reportPooRepository = new ReportPooRepository(ReportPoos);


    postReportPoo = async (userId, pooId, reportContent) => {
        try {
            const reportPoo = await this.reportPooRepository.postReportPoo(userId, pooId, reportContent);
            console.log(reportPoo)
            return { "msg": "푸박스 신고가 완료되었습니다." }
        } catch (error) {
            console.error(error)
            return { error: true, message: error.message };
        }
    };


};

module.exports = ReportPooService;