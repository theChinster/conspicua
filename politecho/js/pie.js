function pies(userData) {
  var colorRamp = d3.scaleLinear().domain([-1, 1]).range(["blue", "red"]);

  var redArray = ["http://www.allsides.com/news/2018-02-01-1115/divisive-and-misleading-state-union?utm_source=AllSides+Mailing+List&utm_campaign=ee7dfad3ae-December_2017_Jobs_Report_1112018&utm_medium=email&utm_term=0_0b086ce741-ee7dfad3ae-",
                  "https://www.cnn.com/2018/04/24/politics/ronny-jackson-donald-trump/index.html",
                  "https://www.huffingtonpost.com/entry/opinion-signorile-pompeo-homophobia_us_5ad9ecdbe4b029ebe0237e87"];
  var blueArray = ["https://www.nationalreview.com/2018/04/mike-pompeo-deserves-confirmation-as-secretary-of-state/",
                   "http://www.allsides.com/news/2018-04-23-0630/trump-ryan-and-american-character",
                   "http://www.allsides.com/news/2018-03-25-1139/surprise-surprise-march-our-lives-once-again-shows-why-left-can%E2%80%99t-be-trusted?utm_source=AllSides+Mailing+List&utm_campaign=ba50312957-Democratic_Memo_Released_03012018&utm_medium=email&utm_term=0_0b086ce741-ba50312957-128337593"];
  var leaning = 0;
  var num = 0;

  var dataFriends = [
  { lean: -1, count: 0},
  { lean: -0.5, count: 0},
  { lean: 0, count: 0},
  { lean: 0.5, count: 0},
  { lean: 1, count: 0}
      ];

  var dataNewsfeed = [
  { lean: -1, count: 0},
  { lean: -0.5, count: 0},
  { lean: 0, count: 0},
  { lean: 0.5, count: 0},
  { lean: 1, count: 0}
      ];

  userData.forEach(function (u) {
    var nearestBucket = (Math.round(u.score * 2) / 2).toFixed(1)
    dataFriends.forEach(function (d) {
      if (nearestBucket == d.lean) {
        d.count += 1;
      }
    });
    dataNewsfeed.forEach(function (d) {
      if (nearestBucket == d.lean) {
        d.count += u.frequency;
      }
    });
  });

  dataFriends.forEach(function (p) {
    num += p.count;
    leaning += p.lean * p.count;
  });

  leaning = leaning / num;
  console.log(leaning);

  var width = 200,
      height = 300,
      radius = Math.min(width, height) / 2;

  var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 50);

  var pie = d3.pie()
      .sort(null)
      .value(function(d) { return d.count; });

      function makeSVG(data, className, label, index) {
        var svgParent = d3.select(".pt-page-3 .col-xs-4").append("svg")
          .attr("class", "pie " + className)
          .attr('viewBox', '0 0 '+width + ' ' + height)
          .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('opacity', 0.5)
            .style('left', '10px');

        var svg = svgParent
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

          var g = svg.selectAll(".arc")
              .data(pie(data))
            .enter().append("g")
              .attr("class", "arc");

          g.append("path")
              .attr("d", arc)
              .style("fill", function(d) { return colorRamp(d.data.lean); });

          svg.append("text").text(label)
            .attr("x", -100)
            .attr("y", 110);

          svgParent
            .transition()
            .delay(300 * index)
            .duration(800)
            .style('opacity', 1)
            .style('left', '0px');
      }

  if (leaning < 0.25 && leaning > 0.25) {
    document.getElementById("success").style = "display : ;";
  } else {
    document.getElementById("failure").style = "display: ;";
    if (leaning >= 0.25 ) {
      var article = redArray[Math.floor(Math.random()*redArray.length)];
      document.getElementById("return").innerHTML = "Unfortunately, the data shows that your Facebook feed has been constructed so as to overemphasize conservative viewpoints."
       + " You can see a visual representation of this leaning on the graph to the left. Please read <a href='" + article + "'>this article</a> and fill out the below survey";
    } else {
      var article = blueArray[Math.floor(Math.random()*blueArray.length)];
      console.log(article);
      document.getElementById("return").innerHTML = "Unfortunately, the data shows that your Facebook feed has been constructed so as to overemphasize liberal viewpoints."
       + " You can see a visual representation of this leaning on the graph to the left. Please read <a href='" + article + "'>this article</a> and fill out the below survey";
    }
  }

};