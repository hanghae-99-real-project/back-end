
class ReportPooRepository {
    constructor(ReportPoosModel, poosModel) {
        this.ReportPoosModel = ReportPoosModel
        this.poosModel = poosModel
    }

    findOneReport = async (userId, pooId) => {
        return await this.ReportPoosModel.findOne({
            where: {
                UserId: userId,
                PooId: pooId,
            }
        });
    };

    findOneReportPoo = async (pooId) => {
        return await this.ReportPoosModel.findOne({
            where: { PooId: pooId }
        });
    };

    postReportPoo = async (userId, pooId, reportContent) => {
        const reportPoo = await this.ReportPoosModel.create({
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
        return await this.ReportPoosModel.destroy({
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

};

module.exports = ReportPooRepository