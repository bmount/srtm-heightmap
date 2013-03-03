function regions (pt) {
  var pt = pt;
  if (!Array.isArray(pt) || pt.length < 2) return false;
  var r = [ 
    [[180,90], [180,90]], // avoid falsy index
    [[-126, 38], [-111.00001, 50]], // region 1
    [[-111, 38], [-97.00001, 50]], // 2
    [[-97, 38], [-83.00001, 50]], // 3
    [[-123, 28], [-100.00001, 37.9999]], //4
    [[-100, 25], [-83.00001, 37.9999]], //5
    [[-83, 17], [-64, 48]], // 6
    [[-180, 0], [-129, 60]] // 7
  ];

  function within (a,i) {
    if (pt[0] >= r[i][0][0] && pt[0] <= r[i][1][0]) {
      if (pt[1] >= r[i][0][1] && pt[1] <= r[i][1][1]) {     
        return i;
      }
      return false;
    }
    return false;
  }

  return r.map(within).filter(Boolean)[0]
}

function urlfor (pt) {
  var r = regions(pt);
  if (!r) return false;
  var baseUrl = "http://dds.cr.usgs.gov/srtm/version2_1/SRTM1/Region_0"
  var hgt = 'N' + ~~pt[1] + 'W' + parseInt(Math.ceil(Math.abs(pt[0]))) + '.hgt';
  return baseUrl + r + '/' + hgt;
}

