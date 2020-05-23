var compsci = [["math115", "math120", "math185", false],
               ["math116", "math121", "math186", false],
               ["eecs203", false],
               ["eecs280", false],
               ["eecs281", false],
               ["eecs370", false],
               ["eecs376", false],
               ["stats250", "stats265", "stats280", "stats412", "stats426", "ioe265", false],
               ["eecs440", "eecs441", "eecs443", "eecs467", "eecs473",
                "eecs480", "eecs494", "eecs495", "eecs497", "eecs470", true],
               ["eecs367", "eecs373", "eecs381", "eecs388", "eecs427",
                "eecs442", "eecs445", "eecs470", "eecs475", "eecs476",
                "eecs477", "eecs478", "eecs481", "eecs482", "eecs483",
                "eecs484", "eecs485", "eecs486", "eecs487", "eecs489",
                "eecs490", "eecs491", "eecs492", "eecs493", true],
               ["eecs367", "eecs373", "eecs381", "eecs388", "eecs427",
                "eecs442", "eecs445", "eecs470", "eecs475", "eecs476",
                "eecs477", "eecs478", "eecs481", "eecs482", "eecs483",
                "eecs484", "eecs485", "eecs486", "eecs487", "eecs489",
                "eecs490", "eecs491", "eecs492", "eecs493", true],
               ["eecs367", "eecs373", "eecs381", "eecs388", "eecs427",
                "eecs442", "eecs445", "eecs470", "eecs475", "eecs476",
                "eecs477", "eecs478", "eecs481", "eecs482", "eecs483",
                "eecs484", "eecs485", "eecs486", "eecs487", "eecs489",
                "eecs490", "eecs491", "eecs492", "eecs493", true],
               ["eecs367", "eecs373", "eecs381", "eecs388", "eecs427",
                "eecs442", "eecs445", "eecs470", "eecs475", "eecs476",
                "eecs477", "eecs478", "eecs481", "eecs482", "eecs483",
                "eecs484", "eecs485", "eecs486", "eecs487", "eecs489",
                "eecs490", "eecs491", "eecs492", "eecs493", true]];

var ulcs = ["eecs367", "eecs373", "eecs381", "eecs388", "eecs427",
            "eecs442", "eecs445", "eecs470", "eecs475", "eecs476",
            "eecs477", "eecs478", "eecs481", "eecs482", "eecs483",
            "eecs484", "eecs485", "eecs486", "eecs487", "eecs489",
            "eecs490", "eecs491", "eecs492", "eecs493"];
var cs_capstone = ["eecs440", "eecs441", "eecs443", "eecs467", "eecs473",
                   "eecs480", "eecs494", "eecs495", "eecs497", "eecs470"];


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

function check_if(course_set, req_set) {
  for (var i = 0; i < req_set.length - 1; i++) {
    if (course_set.has(req_set[i])) { return req_set[i]; }
  }
  return "none";
}

function item_done(item_label, item, show) {
  var temp_desc = document.getElementById(item_label).innerHTML;
  document.getElementById(item_label).innerHTML = document.getElementById(item_label).innerHTML.substring(0,1) + "O" + document.getElementById(item_label).innerHTML.substring(2);
  if (show) {
    document.getElementById(item_label).innerHTML = document.getElementById(item_label).innerHTML + ": " + normalize(item);
  }
  return true;
}

function check_major(course_set, major, list_num) {
  var count = 0;
  var temp_course;
  var temp = new Set();
  for (var i = 0; i < major.length; i++) {
    temp_course = check_if(course_set, major[i]);
    if (temp_course != "none") { item_done("m" + list_num + "item" + i, temp_course, major[i][major[i].length - 1]); count++; temp.add(temp_course); course_set.delete(temp_course); }
  }
  course_set = new Set([...course_set, ...temp]);
  document.getElementById("percentage" + list_num).innerHTML = count + "/" + major.length + " classes taken (" + (count / major.length * 100).toFixed(3) + "%)";
  document.getElementById("major" + list_num).style.backgroundColor = num_to_color(count / major.length, 40);
  return true;
}
