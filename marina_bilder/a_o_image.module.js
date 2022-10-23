
var a_o_image1 = [{
    "s_text":"Es war ihre ungestümte neugier auf das Leben, das sie mit all ihren Sinnen fassen und gestalten wollte.",
    "s_image_name": "1neugier.jpg",
},
{
    "s_text":"Ich denke, es gibt andere Orte, wo sich geschäftliche Dinge abwickeln lassen.",
    "s_image_name": "2andere Orte.jpg",
},
{
    "s_text":"Wir sind krank. Einen Scheissdreck bin ich. ",
    "s_image_name": "3krank.jpg",
},
{
    "s_text":"Ich finde, wenn sich andere Leute streiten, wirkt das immer sehr beruhigend auf die eigene Beziehung. ",
    "s_image_name": "4streiten.jpg",
},
{
    "s_text":"335,210 Elektroherd, E. 20er-Jahre mit Puppe.",
    "s_image_name": "5Elektroherd.jpg",
},
{
    "s_text":"Was er sich nicht eingestand- und er würde es sich nicht eingestehen, bis ans Ende seines Lebens:",
    "s_image_name": "6Eingestehen.jpg",
},
{
    "s_text":"Ein Geschenk brachte jeder mit, doch die meisten nahmen sich vor, das Zehnfache oder gar das Zwanzigfache dessen, was ihre Gabe war, zu verschausen und zu vertrinken. ",
    "s_image_name": "7Geschenk.jpg",
},
{
    "s_text":"Charakterbaby in reich ausgestatteter Wiege",
    "s_image_name": "8Charakterbaby.jpg",
},
{
    "s_text":"Selten sind mir meine eigenen vier Wände so anziehned vorgekommen. ",
    "s_image_name": "9eigenen vier Wände.jpg",
},
{
    "s_text":"Es ist nur für zwei Tage, verdammt. Wir schicken sie doch nicht ins Heim",
    "s_image_name": "10nicht ins Heim.jpg",
},
{
    "s_text":"Wahrscheinlich ist es das, was sich Sieglinde unter einer Surprise-Party vorstellt. ",
    "s_image_name": "11Surprise-Party.jpg",
},
{
    "s_text":"Urlaub. Die ausgehalndelte gehaltserhöhung. Die wohlverdiente Beförderung. Den Umsatzbonus oder einen besonders guten Monat. Den gelungenen Umgang mit kritischer Kundschaft. Den Abschluss eines schwierigen Geschäfts. Das Ende einer Arbeitsreichen Periode. ",
    "s_image_name": "12Urlaub.jpeg",
},
{
    "s_text":"189, 368, 641 Charakterpuppe auf Korbbank, dazu Blechkäfer, um 1900",
    "s_image_name": "13charakterpuppe Korbbank.jpg",
},
{
    "s_text":"Erfolg ist nur die Hälfte der Medaille, die andere, mindestens ebenso glanzvolle ist Glück. Nicht nur ihrem Können haben Sie Ihren Erfolg zu verdanken, sondern auch einem Quäntchen Glück. Und das ist doch ein positiver Gedanke, dass es das Schicksal gut mit Ihnen meint. Freuen Sie sich über Ihren Erfolg und das Glück, dass Sie haben. ",
    "s_image_name": "14Erfolg.jpg",
},
{
    "s_text":"Ich habe furchtbar viel erlebt",
    "s_image_name": "15viel erlebt.jpg",
},
{
    "s_text":"Also kaufte ich zwei Eurostar-Tickets für etwa 240 Pfund, überredetet das Kindermädchen, zwei Tage rund um die Uhr aufzupassen - 150 Pfund - reservierte ein Zimmer in einem kleinen aber schicken Hotel in der Nähe des Boulevard St. Germain - etwa 250 Pfund- und dann sprangen wir einfach in die U-Bahn nach Waterloo und waren kurz daraf nach Paris unterwegs. Got wir waren auf einmal so jung. ",
    "s_image_name": "16Eurostar-Ticket.jpg",
},
{
    "s_text":"Wir sind Rentner. Yeah, das wäre ziehmlich spontan. ",
    "s_image_name": "17rentner.jpg"
}
];


var a_o_image = a_o_image1; 


// import { readJSON, writeJSON, readXLSX } from 'https://deno.land/x/flat@0.0.15/mod.ts'
// var s_path_file = "./Exeltabelle für Puppenbildervideo 2.xlsx"
// const data = await readXLSX(s_path_file)
// // var s_csv = await Deno.readTextFile(s_path_file);
// // a_o_image = CSVtoJSON(s_csv)

// console.log(data)

var s_path_file = "./csv_input.txt"
var s_text = await Deno.readTextFile(s_path_file)
var a_s_line = s_text.split("\n");
var a_o_image = [] 
for(var s_line of a_s_line){
    if(s_line.split("\t")[1].trim() == "Bildname"){
        continue
    }
    a_o_image.push(
        {
            s_text: s_line.split("\t")[0].trim().normalize("NFD"),
            s_image_name: s_line.split("\t")[1].trim().normalize("NFD"),
        }
    )
}
console.log(a_o_image)
export {a_o_image}