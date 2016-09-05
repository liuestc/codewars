var test_date = {
	totalAmount: 0,
	totalDuartion: 0,
	repayPlanDetail: []
};
var App = React.createClsss({
	getInitialState: function() {
		return {
			data: test_data
		}
	},
	componentWillMount: function() {
		let url = Utils.netService + '/page_v3/niuwa_show_load?_token=' + CTK.getToken();
		let param = {
			applyAmount: Utils.getQueryString('applyAmount'),
			applyType: Utils.getQueryString('applyType'),
			applyTerm: Utils.getQueryString('applyTerm')
		};
		param = JSON.stringify(param);
		Ajax.send({
			type: 'post',
			url: url,
			postData: param,
			dataType: 'json',
			success: res => {
				if (res.result_code == 2000) {
					var result = JSON.parse(res.result);
					if (result.success) {
						let repayPlan = result.data.repayPlan;
						let stateData = {
							totalAmount: repayPlan.totalAmount,
							totalDuartion: repayPlan.repayPlanDetail.length,
							repayPlanDetail: repayPlan.repayPlanDetail
						};
						this.setState({
							data: stateData
						})
					}
				}
			}
			error: (xhr, xhr_status) => {
				console.log(xhr_status);
			}


		})

	},

	render: function() {
		return (
			<div id='content-body'>
			<SummaryInfo totalAmount={this.state.data.totalAmount} totalDuartion={this.state.data.totalDuartion} />
        			<PlanList repayPlanDetail={this.state.data.repayPlanDetail} />
			</div>
		)
	}
});

var SummaryInfo = React.createClass({
	render: function() {
		var totalAmount = format_money(this.props.totalAmount);
		return (
			<div className='summary'>
			<div className='first'>应还</div>
			<div className='second'>{totalAmount}</div>
			<div className="third">借款期限&nbsp;<span>{this.props.totalDuartion}</span>个月</div>
			</div>
		)
	}
});

var PlanList = React.createClass({
	render: function() {
		let planList = preprocess_data(this.props.repayPlanDetail);
		let lists = planList.map(function(node, i) {
			let cls = 'repay-data';
			if (i == listLength - 1) {
				cls = 'border-none repay-date'
			}

			return (
				<li key={i}>
				<span>{node.repayDate}</span>
				<div className='nid-circle'>
					<div className='circle'></div>
				</div>

				
				</li>
			)
		})
	}
})