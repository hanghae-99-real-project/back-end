// const NavigationService = require("../(2)services/navigation.service.js");
const path = require('path');


class NavigationController {
    // navigationService = new NavigationService

    startNav = async (req, res) => {
        try {
            // res.sendFile(path.join(__dirname, '../index.html'));
            res.status(200).sendFile(path.join(__dirname, '../index.html'));
        } catch (error) {
            error.failedApi = "길찾기 기능";
            next(error);
        }
    }



    endNav = async (req, res) => {

    }

}


module.exports = NavigationController