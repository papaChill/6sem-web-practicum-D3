document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;      
    const svg = d3.select("svg")
       .attr("width", width)
	   .attr("height", height) ;


    const formElem = document.getElementById("setting");
    const checkbox = document.getElementById("checkAnim");
    const drawBtn = document.getElementById("draww");
    const animBtn = document.getElementById("animBtn");
    const dellBtn = document.getElementById("dell");

    checkbox.addEventListener("change", function() {
        const isChecked = checkbox.checked;
        const animFields = document.querySelectorAll(".anim-field");
        animFields.forEach(el => {
            el.style.display = isChecked ? "inline" : "none";
        });
        drawBtn.style.display = isChecked ? "none" : "inline";
    });

    document.getElementById("pathCheck").addEventListener("change", function() {
        const isPath = this.checked;
        document.getElementById("coord-block").style.display = isPath ? "none" : "flex";
        document.getElementById("path-block").style.display = isPath ? "flex" : "none";
        document.getElementById("scale-block").style.display = isPath ? "none" : "flex";
        document.getElementById("rotate-block").style.display = isPath ? "none" : "flex";
    });

    drawBtn.addEventListener("click", function() {
        draw(formElem);
    });
    animBtn.addEventListener("click", function() {
        runAnimation(formElem);
    });
    dellBtn.addEventListener("click", function() {
        svg.selectAll("*").remove();
    });
});

const draw = (dataForm) => {
	const svg = d3.select("svg")
    let pict = drawSmile(svg)
    
    
    const x = dataForm.cx.value;
    const y = dataForm.cy.value;
    const scaleX = dataForm.xx.value;
    const scaleY = dataForm.yy.value;
    const rotation = dataForm.rot.value;

    pict.attr("transform", `translate(${x}, ${y}) scale(${scaleX}, ${scaleY}) rotate(${rotation})`);
}

const runAnimation = (dataForm) => {
    
    const svg = d3.select("svg")
    let pict = drawSmile(svg);
    const easingType = document.getElementById("easingType").value;
    let selectedEase;

    if (easingType === "linear") {
        selectedEase = d3.easeLinear;
    } else if (easingType === "elastic") {  
        selectedEase = d3.easeElastic;
    } else if (easingType === "bounce") {
        selectedEase = d3.easeBounce;
    }
    if (!document.getElementById("pathCheck").checked) {    
        
        
        const x1 = dataForm.cx.value;
        const y1 = dataForm.cy.value;
        const sx1 = dataForm.xx.value;
        const sy1 = dataForm.yy.value;
        const r1 = dataForm.rot.value;

        const x2 = dataForm.cx_end.value;
        const y2 = dataForm.cy_end.value;
        const sx2 = dataForm.xx_end.value;
        const sy2 = dataForm.yy_end.value;
        const r2 = dataForm.rot_end.value;
        
        pict
        .attr("transform", `translate(${x1}, ${y1}) scale(${sx1}, ${sy1}) rotate(${r1})`)
        .transition()
        .duration(6000)
        .ease(selectedEase)
        .attr("transform", `translate(${x2}, ${y2}) scale(${sx2}, ${sy2}) rotate(${r2})`);
    }  else {
        const Pathh = document.getElementById("pathSelect").value;
        let nPath;

        if (Pathh === "gamma") {
            nPath = "0";
        } else if (Pathh === "circle") {  
            nPath = "1";
        } 
        
		let path = drawPath(nPath/* номер опции из поля со списком с путями */);	
		pict.transition()
        .ease(selectedEase) // установить в зависимости от настроек формы
        .duration(6000)
        .attrTween('transform', translateAlong(path.node()));
        
	}
}




    
