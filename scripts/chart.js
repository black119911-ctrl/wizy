
const ctx = document.getElementById('myChart');

const DATA_COUNT = 14;
const labels = [];
for (let i = 1; i <= DATA_COUNT; ++i) {
    labels.push(i + '.04')
}


const datapoints = [721, 653, 789, 609, 717, 692, 756, 634, 771, 619, 745, 668, 763, 641]
const datapointsBlue = [423, 491, 514, 456, 408, 537, 472, 501, 439, 485, 543, 467, 419, 526]
const datapointsGreen = [179, 326, 271, 183, 369, 214, 347, 198, 295, 382, 167, 243, 309, 256]


const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = '#fff';
        tooltipEl.style.borderRadius = '8px';
        tooltipEl.style.color = '#1E1F2A';
        // tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(0, 0)';
        tooltipEl.style.transition = 'all .3s ease';
        tooltipEl.style.boxShadow = '0px 4px 6px -2px #0A0D1208';
        tooltipEl.style.boxShadow = ' 0px 12px 16px -4px #0A0D1214'
        // tooltipEl.style.width = '368px'
        // tooltipEl.style.paddingTop = '100px !important'


        const table = document.createElement('table');
        table.style.border = 'none'
        table.style.margin = '0px';
        table.style.margin = '18px 24px'
        table.style.width = 'auto'
        
        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};



const externalTooltipHandler = (context) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }


    // console.log(tooltip.body);

    // Set Text
    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map(b => b.lines);

    
        const tableHead = document.createElement('thead');

        titleLines.forEach(title => {
            const tr = document.createElement('tr');
            tr.style.borderWidth = 0;

            const th = document.createElement('th');
            th.style.borderWidth = 0;
            th.colSpan = 3

            const titleParent = document.createElement('div')
            titleParent.style.display = 'flex'
            titleParent.style.flexDirection = 'column'

            const titleSpan = document.createElement('span');
            titleSpan.style.fontSize = '17px'
            const titleText = document.createTextNode(title);
            titleSpan.append(titleText)
        
            const subTitleSpan = document.createElement('span')
            subTitleSpan.style.color = '#848994'
            subTitleSpan.style.fontSize = '15px'
            const subTitleText = document.createTextNode('По сравнению с предыдущим днем')
            subTitleSpan.append(subTitleText)

            titleParent.append(titleSpan)
            titleParent.append(subTitleSpan)

            th.appendChild(titleParent);
            tr.appendChild(th);
            tableHead.appendChild(tr);

        });

        const tableBody = document.createElement('tbody');

        const rows = [
            ['Перешли в карточку', 1, 2180],
            ['Добавили в корзину', -12, 546],
            ['Заказали', 120, 23],
            ['Выкупили', 56, 678],
        ]

        rows.forEach(row => {
            let tr = document.createElement('tr')
        

            row.forEach((cell, index) => {
                let td = document.createElement('td')
                td.style.borderBottom = 'none'
                td.style.fontSize = '15px'
                let tdText

                switch (index) {
                    case 0:
                        td.style.fontWeight = '500'
                        td.style.paddingRight = '47px'
                        tdText = document.createTextNode(cell)
                        break
                    case 1:
                        td.style.fontWeight = '600'
                        td.style.color = parseInt(cell) < 0 ? '#B42318' : '#027A48'

                        let percent = Math.abs(cell)
                        let percentTextNode = document.createTextNode(percent + '%')
                        let percentSpan = document.createElement('span')
                        percentSpan.append(percentTextNode)

                        let arrowSpan = document.createElement('span')
                        arrowSpan.style.width = '7px'
                        arrowSpan.style.marginRight = '4px'
                        let arrowImage = document.createElement('img')

                        if (parseInt(cell) < 0) {
                            arrowImage.src = '../images/svg/red-arrow-down.svg'
                        } else {
                            arrowImage.src = '../images/svg/green-arrow-up.svg'
                        }

                        arrowImage.style.width = '7px'
                        arrowSpan.append(arrowImage)

                        
                        tdText = document.createElement('div')
                        tdText.style.display = 'flex'
                        tdText.style.alignItems = 'center'
                        tdText.append(arrowSpan)
                        tdText.append(percentSpan)
                        

                        break
                    case 2:
                        td.style.fontWeight = '800'
                        td.style.textAlign = 'right'
                        tdText = document.createTextNode(cell)
                        break
                }

                td.append(tdText)
                tr.append(td)
            })
            

            tableBody.append(tr)
        })

        /*
        bodyLines.forEach((body, i) => {
            const colors = tooltip.labelColors[i];

            const span = document.createElement('span');
            span.style.background = colors.backgroundColor;
            span.style.borderColor = colors.borderColor;
            span.style.borderWidth = '2px';
            span.style.marginRight = '10px';
            span.style.height = '10px';
            span.style.width = '10px';
            span.style.display = 'inline-block';

            const tr = document.createElement('tr');
            tr.style.backgroundColor = 'inherit';
            tr.style.borderWidth = 0;

            const td = document.createElement('td');
            td.style.borderWidth = 0;


            const text = document.createTextNode(body);

            td.appendChild(span);
            td.appendChild(text);
            tr.appendChild(td);
            tableBody.appendChild(tr);
        });

        */

        const tableRoot = tooltipEl.querySelector('table');

        // Remove old children
        while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
        }

        // Add new children
        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    // tooltipEl.style.font = tooltip.options.bodyFont.string;
    // tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';

    
    
    let offsetX = tooltip.caretX
    if (offsetX > 950) {
        tooltipEl.style.left = tooltip.caretX - 382 + 'px';
    }


    let offsetY = tooltip.caretY
    // console.log(offsetY);

    if (offsetY > 211) {
        tooltipEl.style.top = tooltip.caretY - 251 + 'px';
    }


    


    // var offset = tooltip.caretX + 20;
    // if (offset < tooltip.width) 
    //     offset = tooltip.width;
    // else if (tooltip.caretX > this._chart.width - tooltip.width)
    //     offset = this._chart.width - tooltip.width;

    // // Hidden Code
    // tooltipEl.style.left = positionX + offset + 'px';

};


const data = {
    labels: labels,
    datasets: [
        {
            label: '',
            data: datapointsGreen,
            borderColor: '#5DF098',
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            fill: true,
            backgroundColor: ['#ECF5F2'],
            // hidden: true
        },
        {
            label: '',
            data: datapointsBlue,
            borderColor: '#71A7F9',
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            fill: true,
            backgroundColor: ['#F3F3F5']
        },
        {
            label: '',
            data: datapoints,
            borderColor: '#F39844',
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            fill: true,
            backgroundColor: ['#FEF7F1']
            // backgroundColor: 'rgba(254,247,241, 1)'
        }
    ]
};

let chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: ''
            },
            tooltip: {
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler,
                padding: 0,
            },
            legend: {
                display: false
            }
        },
        interaction: {
            intersect: false,
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true
                },
                ticks: {
                    font: {
                        family: "Inter"
                    }
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                },
                position: 'right',
                max: 1000,
                min: 0,
                ticks: {
                    stepSize: 200,
                    font: {
                        family: "Inter"
                    }
                }
            }
        }
    }
});



const checkboxes = document.querySelectorAll(".chart-checkbox-input")

checkboxes.forEach((cb, index) => {
    cb.addEventListener("change", () => {
        chart.data.datasets[index].hidden = !cb.checked;
        chart.update(); 
    }); 
});