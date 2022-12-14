export function isMacintosh() {
  return navigator.platform.indexOf('Mac') > -1;
}

export function isWindows() {
  return navigator.platform.indexOf('Win') > -1;
}

export function detectBrowser(){
  let ua = navigator.userAgent, tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if(/trident/i.test(M[1])){
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return {name:'IE',version:(tem[1] || '')};
  }
  if(M[1]=== 'Chrome'){
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if(tem != null) return {name:tem[1].replace('OPR', 'Opera'),version:tem[2]};
  }
  M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem = ua.match(/version\/(\d+)/i))!= null)
      M.splice(1, 1, tem[1]);
  return {name:M[0], version:M[1]};
}

export function isTouch() {
  return navigator.userAgent.match(/iPad|iPhone|Android/i);
}

export function isIOS() {
  return navigator.userAgent.match(/iPad|iPhone/i);
}

export function isMobile() {
    const isHoverableDevice = window.matchMedia(
        '(hover: hover) and (pointer: fine)'
    );
    const mobile = !isHoverableDevice.matches;
    return {mobile};
}
