
class ReportPooRepository {
    constructor(ReportPoos) {
        this.ReportPoos = ReportPoos
    }


    // 푸박스신고
    postReportPoo = async (userId, pooId, reportContent) => {
        const reportPoo = await this.ReportPoos.create({
            UserId: userId,
            PooId: pooId,
            reportContent
        });
        //동일한 PooId의 값이 create 될때마다
        //PooId = 1에 해당하는 reportCount +1 씩 증가
        //PooId, reportCount 0..2...5
        //reportCount가 5가 될때 db에서 삭제
        return reportPoo
    };


};

module.exports = ReportPooRepository