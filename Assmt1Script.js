d3.csv("Bigfoot Sightings in MA - Sheet1.csv").then(function(data) {
    const svg = d3.select("#plot");
    const svg2 = d3.select("#plot2");

    const pad = 1.3;
    const yPad = 60;
    leftMarg = 40;
    bigR = 28;
    medR = 12;
    smallR = 3;

    function countyToXCoord(county) {
        if (county == "Berkshire") {return leftMarg + pad * 0}
        if (county == "Franklin") {return leftMarg + pad * 50}
        if (county == "Hampshire") {return leftMarg + pad * 100}
        if (county == "Hampden") {return leftMarg + pad * 150}
        if (county == "Worcester") {return leftMarg + pad * 200}
        if (county == "Essex") {return leftMarg + pad * 250}
        if (county == "Bristol") {return leftMarg + pad * 300}
        if (county == "Plymouth") {return leftMarg + pad * 350}
        if (county == "Barnstable") {return leftMarg + pad * 400}
    }

    const points = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) {return countyToXCoord(d["County"])})
            .attr("cy", function(d) {return yPad + 50 * d["Index"]})
            .attr("r", function(d) {
                if (d["Class"] == "A") {return bigR}
                else if (d["Class"] == "B") {return medR}
                else if (d["Class"] == "C") {return smallR}
            })
            .attr("fill", function(d) {
                if (d.Season == "Spring") {return "green"}
                else if (d.Season == "Summer") {return "yellow"}
                else if (d.Season == "Fall") {return "orange"}
                else if (d.Season == "Winter") {return "blue"}
            })
                
    //column labels        
    var txt = svg.selectAll("text")
        .data(data, function(d) {return d.County})
        .enter().append("text")
            .style("fill", "black")
            .attr("text-anchor", "middle")
            .attr("x",function(d) {return countyToXCoord(d["County"])})
            .attr("y", yPad )
            .attr("font-size", "11px")
            .attr("font-weight", "bold")
            .text(function(d) {return d.County})

    //circle labels        
    data.forEach(function(d) {
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", countyToXCoord(d.County))
            .attr("dx", function() {
                if (d.Class == "C") {return 15} else {return 0}
            })
            .attr("y", yPad + 50 * d["Index"])
            .attr("font-size", "11px")
            .attr("alignment-baseline", "middle")
            .attr("fill", function() {
                if (d.Season == "Spring" || d.Season == "Winter") {return "white"} else {return "black"}
            })
            .text(d.Year)
    })

    

    legY1 = 70
    legY2 = legY1 + 50
    legY3 = legY2 + 40
    legWinterX = leftMarg + pad * 200
    legSpringX = leftMarg + pad * 250
    legSummerX = leftMarg + pad * 300
    legFallX = leftMarg + pad * 350

    //title:
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("font-size", "20px")
        .attr("x", legWinterX)
        .attr("y", 15)
        .text("Bigfoot Sigtings By County")

    svg2.append("text")
        .attr("text-anchor", "left")
        .attr("font-weight", "bold")
        .attr("font-size", "20px")
        .attr("x", leftMarg)
        .attr("dx", -bigR)
        .attr("y", 20)
        .text("Class Legend")

    svg2.append("text")
        .attr("font-weight", "bold")
        .attr("font-size", "20px")
        .attr("x", legWinterX)
        .attr("dx", -bigR)
        .attr("y", 20)
        .text("Season Legend")

    svg2.append("circle")
        .attr("cx", leftMarg)
        .attr("cy", legY1)
        .attr("r", bigR)

    svg2.append("circle")
        .attr("cx", leftMarg)
        .attr("cy", legY2)
        .attr("r", medR)

    svg2.append("circle")
        .attr("cx", leftMarg)
        .attr("cy", legY3)
        .attr("r", smallR)

    svg2.append("text")
        .attr("text-anchor", "left")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "14px")
        .attr("x", leftMarg + 40)
        .attr("y", legY1)
        .text("Class A")

    svg2.append("text")
        .attr("text-anchor", "left")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "14px")
        .attr("x", leftMarg + 40)
        .attr("y", legY2)
        .text("Class B")
    
    svg2.append("text")
        .attr("text-anchor", "left")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "14px")
        .attr("x", leftMarg + 40)
        .attr("y", legY3)
        .text("Class C")

    svg2.append("circle")
        .attr("cx", legWinterX)
        .attr("cy", legY1)
        .attr("r", bigR)
        .attr("fill", "blue")

    svg2.append("circle")
        .attr("cx", legSpringX)
        .attr("cy", legY1)
        .attr("r", bigR)
        .attr("fill", "green")

    svg2.append("circle")
        .attr("cx", legSummerX)
        .attr("cy", legY1)
        .attr("r", bigR)
        .attr("fill", "yellow")

    svg2.append("circle")
        .attr("cx", legFallX)
        .attr("cy", legY1)
        .attr("r", bigR)
        .attr("fill", "orange")


    svg2.append("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "11px")
        .attr("x", legWinterX)
        .attr("y", legY1)
        .attr("fill", "white")
        .text("Winter")

    svg2.append("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "11px")
        .attr("x", legSpringX)
        .attr("y", legY1)
        .attr("fill", "white")
        .text("Spring")

    svg2.append("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "11px")
        .attr("x", legSummerX)
        .attr("y", legY1)
        .attr("fill", "black")
        .text("Summer")

    svg2.append("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "11px")
        .attr("x", legFallX)
        .attr("y", legY1)
        .attr("fill", "black")
        .text("Fall")


            

})