import * as DefaultData from '../../features/defaultData.js'
import * as BackgroundConfiguration from '../ZenGakuWidget/backgroundConfiguration.js'
export {
    loadDataFromUserData
}


/**
 * import data from session storage to defaultData
 */
const loadDataFromUserData = () => {
    DefaultData.load(JSON.parse(sessionStorage.data));
    BackgroundConfiguration.changeBackground(DefaultData.BackgoundConfiguration.setBackground);
}
