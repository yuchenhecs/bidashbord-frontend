angular
    .module('app')
    .controller('GoalsController', GoalsController);

function GoalsController() {
	var vm = this;

    vm.mainGridOptions = {
        dataSource: {
            data: [{ Name: "Stable Earnings", RiskLevel: "Conservative", Source: "Vanguard", Type: "ClassModel", ExpenseRatio: "20%", StandardDevition: "1%", ThreeMonthReturn: "2%", OneYearReturn: "3%", ThreeYearReturn: "4%", FiveYearReturn: "5%" },
            { Name: "Tmo Seven", RiskLevel: "Moderate", Source: "Vanguard" },
            { Name: "Senior Care", RiskLevel: "Balanced", Source: "Vanguard" },
            { Name: "Gold All the Way", RiskLevel: "Aggressive", Source: "BlackRock" }],
            schema: {
                model: {
                    fields: {
                        Name: { type: "string" },
                        RiskLevel: { type: "string" },
                        Source: { type: "string" },
                        Type: { type: "string" },
                        ExpenseRatio: { type: "string" },
                        StandardDevition: { type: "string" },
                        ThreeMonthReturn: { type: "string" },
                        OneYearReturn: { type: "string" },
                        ThreeYearReturn: { type: "string" },
                        FiveYearReturn: { type: "string" }
                    }
                }
            },
            pagesize: 10,
        },
        sortable: true,
        pageable: true,
        height: 500,
        filterable: {
            mode: "row"
        },
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        columns: [{
            field: "Id",
            title: "Name",
            width: 150,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    operator: "contains",
                    width: 150,
                    height: 30
                }
            },
            template: "<a href='\\#' class='templateLink' ng-click='details.open()' style='color:viking;text-decoration:none;'>#=Name#</a>"
        }, {
            field: "RiskLevel",
            title: "Risk Level",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    operator: "contains",
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "Source",
            title: "Vendor",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    operator: "contains",
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "Type",
            title: "Type",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "ExpenseRatio",
            title: "Expense Ratio",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "StandardDevition",
            title: "Standard Devition",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "ThreeMonthReturn",
            title: "Three Month Return",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "OneYearReturn",
            title: "One Year Return",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "ThreeYearReturn",
            title: "Three Year Return",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    width: 75,
                    height: 30
                }
            }
        }, {
            field: "FiveYearReturn",
            title: "Five Year Return",
            width: 75,
            height: 40,
            filterable: {
                cell: {
                    showOperators: false,
                    width: 75,
                    height: 30
                }
            }
        }]
    };

    vm.windowOptions = {
        modal: true,
        draggable: true,
        width: 1425,
        height: 444,
        title: "Grid Window",
        actions: ['Close'],
        visible: false,
        animation: {
            open: {
                effects: "slideIn:left fadeIn",
                duration: 500
            },
            close: {
                effects: "slideIn:left fadeIn",
                reverse: true,
                duration: 500
            }
        },
        position: {
            // top: 135,
            top: angular.element('#grid').offset().top,
            left: 448
        },
        resizable: true
    };

    vm.chartsConfig = {
        history: {
            chart: {
                type: 'pie',
                height: 350
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            tooltip: {
                shared: true
            },
            legend: {
                align: 'right',
                verticalAlign: 'center',
                layout: 'vertical',
                x: 0,
                y: 100
            },
            series: [{
                showInLegend: true,
                innerSize: '50%'
            }],
            title: {
                text: 'Stable Earnings',
                align: 'left'
            },
            credits: {
                enabled: false
            }
        }
    };
    vm.chartsConfig.history.series[0].data = [{
        name: 'US Bond',
        y: 22,
        color: '#C0C0C0'
    }, {
        name: 'US Stock',
        y: 18,
        color: '#C0C0C0'
    }, {
        name: 'Non US Bond',
        y: 24,
        color: '#A9A9A9'
    }, {
        name: 'Non US Stock',
        y: 16,
        color: '#808080'
    }, {
        name: 'Cash',
        y: 20,
        color: '#696969'
    }];

    vm.detailGridOptions = {
        selectable: true,
        resizable: true,
        pageable: false,
        editable: false,
        height: 70,
        dataSource: {
            //type: "odata",
            //transport: {
            //    read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            //},
            data: [{ Name: "Stable Earnings", RiskLevel: "Conservative", Source: "Vanguard", Type: "ClassModel", ExpenseRatio: "20%", StandardDevition: "1%", ThreeMonthReturn: "2%", OneYearReturn: "3%", ThreeYearReturn: "4%", FiveYearReturn: "5%" }],
        },
        columns: [{
            field: "ExpenseRatio",
            title: "Expense Ratio",
            width: "120px",
        }, {
            field: "StandardDevition",
            title: "Standard Devition",
            width: "120px"
        }, {
            field: "ThreeMonthReturn",
            title: "Three Month Return",
            width: "120px"
        }, {
            field: "OneYearReturn",
            title: "One Year Return",
            width: "120px"
        }, {
            field: "ThreeYearReturn",
            title: "Three Year Return",
            width: "120px"
        }, {
            field: "FiveYearReturn",
            title: "Five Year Return",
            width: "120px"
        }]
    }
};
