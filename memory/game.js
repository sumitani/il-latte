var old_address = [];
var current_address = [];
var image_mapping = Array();
var ids_used = Array();

function input_score(points) {
	var current_score;
	score = document.getElementById("score");
	current_score = score.innerText;
	total_score = +current_score + +points;
	if (total_score < 0)
		total_score = 0;
	score.innerText = total_score;
}

// Fisher-Yates shuffling algorithm
// Taken at http://sedition.com/perl/javascript-fy.html
function randomize_it (this_array) {
  var i = this_array.length;
  if (i == 0) return false;
  while (--i)
  {
     var j = Math.floor(Math.random() * ( i + 1 ));
     var tempi = this_array[i];
     var tempj = this_array[j];
     this_array[i] = tempj;
     this_array[j] = tempi;
  }
}

function already_clicked_this(id)
{
    for (i = 0; i < ids_used.length; i++)
    {
       if (ids_used[i] == id) return true;
    }
    return false;
}

function analyze_that(id)
{
    if (already_clicked_this(id) == true)
        return;

    quadro = document.getElementById("pos_"+id);
    quadro.src = image_mapping[id];

    if (old_address != "")
    {
        ad_1 = document.getElementById("pos_"+old_address[0]);
        ad_2 = document.getElementById("pos_"+old_address[1]);
        ad_1.src = "11.png";
        ad_2.src = "11.png";
        old_address = [];
    }

    if (current_address == "") {
        current_address[0] = image_mapping[id];
        current_address[1] = id;
    }
    else if (current_address[1] != id)
    {
        if (current_address[0] != image_mapping[id])
        {
			input_score('-10');
            old_address[1] = current_address[1];
            old_address[0] = id;
            current_address = [];
        }
        else
        {
			input_score('10');
            ids_used.push(current_address[1]);
            ids_used.push(id);
            current_address = [];
        }
    }

    if( ids_used.length == 20 )
        alert('Parabéns! Você ganhou!');
}

function write_a_table(image_mapping)
{
    document.write("<table id=\"cards_table\">");
    counter = 0;
    for (i = 0; i < 4; i++)
    {
        document.write("<tr>");
        for (y = 0; y < 5; y++) {
            document.write("<td><div><img id=\"pos_"+counter+"\" draggable=\"false\" src=\"11.png\" onclick=\"analyze_that('" + counter + "');\" /></div></td>");
            counter++;
        }
        document.write("</tr>");
    }
    document.write("</table>");
}

function update_table()
{
	for (i = 0; i < 10; i++)
	{
		image_mapping[i] = (i+1) + ".png";
	}
	for (i = 0; i < 10; i++)
	{
		image_mapping[i+10] = (i+1) + ".png";
	}

	randomize_it(image_mapping);

	write_a_table(image_mapping);
}

var showing_images;
var counter_showing_images;

function show_images()
{
	for (id = 0; id < 20; id++)
	{
		pos_id = document.getElementById("pos_"+id);
		pos_id.src = image_mapping[id];
	}
	showing_images = setInterval(close_them, 2000);
	counter_showing_images = setInterval(decrease_show_counter, 1000);
}

function close_them()
{
	clearInterval(showing_images);
	counter_field = document.getElementById("counter_show");
	counter_field.innerHTML = "<div id=\"counter_show\"></br></div>";
	clearInterval(counter_showing_images);
	
	for (id = 0; id < 20; id++)
	{
		pos_id = document.getElementById("pos_"+id);
		pos_id.src = "11.png";
	}
}

function decrease_show_counter()
{
	counter_field = document.getElementById("counter_show");
	counter = counter_field.innerText;
	counter = +counter - 1;
	counter_field.innerText = counter;
}
