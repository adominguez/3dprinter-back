const authenticationToken = exports.authenticationToken = () => {
  return '3DMAKERNOW'
}

exports.checkAuthenticationToken = (authentication) => {
  if(authentication === authenticationToken()) {
    return true;
  }
  return false;
}
