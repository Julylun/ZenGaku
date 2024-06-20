export {
    logout
}
const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    location.href = '/ZenGaku_Full_war/';
}