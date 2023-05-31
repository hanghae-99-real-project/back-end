
class ReportPooRepository {
    constructor(ReportPoos, poosModel) {
        this.ReportPoos = ReportPoos
        this.poosModel = poosModel
    }


    findOneReport = async (userId, pooId) => {
        return await this.ReportPoos.findOne({
            where: {
                UserId: userId,
                PooId: pooId,
            }
        });
    };
    findOneReportPoo = async (pooId) => {
        return await this.ReportPoos.findOne({
            where: { PooId: pooId }
        });
    };


    // 푸박스신고
    postReportPoo = async (userId, pooId, reportContent) => {
        const reportPoo = await this.ReportPoos.create({
            UserId: userId,
            PooId: pooId,
            reportContent
        });
        return reportPoo
    };

    incrementReportCount = async (findOneReportPoo) => {
        findOneReportPoo.reportCount += 1;
        return await findOneReportPoo.save();
    };




    destroyReportPoo = async (userId, pooId) => {
        return await this.ReportPoos.destroy({
            where: {
                UserId: userId,
                PooId: pooId,
            }
        });
    };

    destroyPoo = async (pooId) => {
        return await this.poosModel.destroy({
            where: {
                PooId: pooId
            }
        })
    }

    // destroyReportPooId = async (reportId) => {
    //     return await this.ReportPoos.destroy({
    //         where: {
    //             PooId: pooId
    //         }
    //     })
    // }

};

module.exports = ReportPooRepository