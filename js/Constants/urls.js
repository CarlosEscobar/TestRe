var serverHome = "http://localhost:5189/";
var apiHome = "http://localhost:5219/";

var serverUrls = {
    businessProfile: serverHome + 'Business/Profile',
    clientProfile: serverHome + 'Client/Profile',
}

var apiUrls = {
    roles: apiHome + 'roles/roles',
    register: apiHome + 'authentication/register',
    login: apiHome + 'authentication/login',
    user: apiHome + 'users/user',
    b_user: apiHome + 'users/b_user',
    c_user: apiHome + 'users/c_user',
    file: apiHome + 'files/file',
    ufile: apiHome + 'files/ufile',
    sfile: apiHome + 'files/sfile',
    servicedef: apiHome + 'servicedefs/servicedef',
    b_servicedefs: apiHome + 'servicedefs/b_servicedefs',
    c_servicedefs: apiHome + 'servicedefs/c_servicedefs',
    servicedef_rent: apiHome + 'servicedefs/rent',
    servicedef_sell: apiHome + 'servicedefs/sell',
    servicedef_meeting: apiHome + 'servicedefs/meeting',
    servicedef_videocall: apiHome + 'servicedefs/videocall',
    preservice: apiHome + 'services/preservice',
    buyservice: apiHome + 'services/buyservice',
    services: apiHome + 'services/services',
    rating: apiHome + 'services/rating',
    ratings: apiHome + 'services/ratings'
};