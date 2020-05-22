function num_to_color(perc, darkness) {
  var dark_diff = 255 - darkness;
  var color_num = dark_diff * 65536 + darkness;
  if (perc < .5) {
    color_num += Math.floor(dark_diff * perc * 2) * 256;
  }
  else if (perc > .5) {
    color_num += dark_diff * 256;
    color_num -= Math.floor(dark_diff * (perc - 0.5) * 2)  * 65536;
  }
  var color_hex = color_num.toString(16);
  if (color_hex.length == 4) {
    color_hex = "00" + color_hex;
  }
  else if (color_hex.length == 5) {
    color_hex = "0" + color_hex;
  }
  return '#' + color_hex;
}

function hideshow(id) {
  var x = document.getElementById(id);
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


function normalize(course) {
  var res = course.toUpperCase();
  return res.substring(0, res.length - 3) + " " + res.substring(res.length - 3, res.length);
}