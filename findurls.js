function region (pt) {
  var pt = pt, regions, r;
  if (!Array.isArray(pt) || pt.length < 2) return false;
  /*
   * Boundaries of SRTM regions as lower left -> upper right:
   *   [[min lon,min lat], [max lon, max lat]]
   * The records use lower left coordinates, so N37W123.hgt covers 37->38 lat, -123->-122 lon
   * See: http://dds.cr.usgs.gov/srtm/version2_1/SRTM1/Region_definition.jpg
   */
  regions = r = [
    [[-126, 38], [-111, 50]], // region 1, Washington, Oregon etc
    [[-111, 38], [-97, 50]], // 2
    [[-97, 38], [-83, 50]], // 3
    [[-123, 28], [-100, 38]], // 4
    [[-100, 25], [-83, 38]], // 5
    [[-83, 17], [-64, 48]], // 6
    [[-180, 0], [-129, 60]] // 7
  ];

  var hit = 0;

  function within (a,i) {
    if (pt[0] >= r[i][0][0] && pt[0] < r[i][1][0]) {
      if (pt[1] >= r[i][0][1] && pt[1] < r[i][1][1]) {     
        return hit = i + 1;
      }
      return false;
    }
    return false;
  }

  if (!r.some(within)) return false;
  return hit;
}

function urlfor (pt) {
  var r = region(pt);
  if (!r) return false;
  var baseUrl = "http://dds.cr.usgs.gov/srtm/version2_1/SRTM1/Region_0"
  var hgt = 'N' + ~~pt[1] + 'W' + parseInt(Math.ceil(Math.abs(pt[0]))) + '.hgt.zip';
  return baseUrl + r + '/' + hgt;
}

