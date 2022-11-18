import React, { useState } from "react";
import axios from "axios";
import Chart from "./Chart";



export default function AssessCommerce(props) {
  const [startMonth, setStartMonth] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [avgValue, setAvgValue] = useState('');
  const [lifeValue, setLifeValue] = useState('');
  const [retentionValue, setRetentionValue] = useState('');
  const [refundValue, setRefundValue] = useState('');
  const [salesDataCategoreis, setSalesDataCategoreis] = useState([]);
  const [salesDataSeries, setSalesDataSeries] = useState([]);
  const [graphCategory, setGraphCategory] = useState('');
  const [customerDataSeries, setCustomerDataSeries] = useState([]);
  const [ordersDataSeries, setOrdersDataSeries] = useState([]);


  const getApiData = async (start, end) => {

    if (start !== '' && end != '') {

      await axios.get(`${props.endUrl}/CODAT/assess_commerce/${props.leadId}/${start}/${end}`)
        .then(res => {
          console.log(res.data);

          setSalesDataSeries([{
            'name': 'Revenue',
            'data': res.data.revenue
          },
          {
            'name': 'Revenue Growth',
            'data': res.data.revenue_g
          }
          ]);
          setAvgValue(res.data.avgvalue);
          setLifeValue(res.data.lifevalue);
          setRetentionValue(res.data.retentionvalue);
          setRefundValue(res.data.refundvalue);
          setSalesDataCategoreis(res.data.date);

          setCustomerDataSeries([{
            'name': 'Existing customers',
            'data': res.data.e_c
          },
          {
            'name': 'New customers',
            'data': res.data.n_c
          },
          {
            'name': 'Total customers',
            'data': res.data.t_c
          }
          ]);

          setOrdersDataSeries([{
            'name': 'Total order value',
            'data': res.data.t_o_v
          },
          {
            'name': 'Total refund value',
            'data': res.data.t_r_v
          }
          ]);


          setGraphCategory('customer');

        }).catch(err => {


        })
    }
  }





  return (
    <div className="chart-panel">
      <div className="col-md-12">
        <h3>Commerce</h3>
        <div className="row">
          <div className="col-md-3">
            <div className=" col-for-logo">
              <img src={require("../../images/gbp.png")} alt="" className="logo-dashboard" />

              <h3><strong>GBP</strong>
                <span>Great British Pound</span></h3>
            </div></div>
          <div className="col-md-3 source-sandbox">
            <label>Source </label> <img src={require("../../images/CommerceSandbox_Square.png")} alt="" className="commerce-img" />
            <label> Commerce Sandbox</label>
          </div>
          <div className="col-md-3 ">
            <div className="box-shape">
              <label>Start Month</label>
              <input type="month" value={startMonth} onChange={(e) => {
                setStartMonth(e.target.value);
                getApiData(e.target.value, endMonth);
              }} className="period-start" />
            </div></div>
          <div className="col-md-3 ">
            <div className="box-shape">
              <label>End Month</label>
              <input type="month" value={endMonth} onChange={(e) => {
                setEndMonth(e.target.value);
                getApiData(startMonth, e.target.value);
              }} className="period-start" />
            </div></div>

        </div>

        <div className="chart-div">
          <h3>Sales</h3>
          <div className="chart-second">
            <div className="row">
              <div className="col-md-12">
                <div className="value-box">
                  <label>Av. order value</label>
                  <h2 id="refundval">£{lifeValue}</h2>
                </div>
              </div>
            </div>
          </div>

          {lifeValue !== '' && <Chart categories={salesDataCategoreis} series={salesDataSeries} />}



          <div className="chart-second">
            <div className="row">
              <div className="col-md-12">
                <div className="value-box">
                  <label>Refund rate</label>
                  <h2 id="refundval">{refundValue}%</h2>
                </div>
                <div className="value-box">
                  <label>Customer retention</label>
                  <h2 id="retentionval">{retentionValue}%</h2>
                </div>
                <div className="value-box">
                  <label>Lifetime value</label>
                  <h2 id="lifetimevlaue">£{lifeValue}</h2>
                </div>
                <div className="select-graph">
                  <div className="box-shape">
                    <label>Select Graph</label>
                    <select id="selectaccessgraph" onChange={(e) => setGraphCategory(e.target.value)}>
                      <option value="customer" selected="">New vs. existing customers</option>
                      <option value="orders">Orders vs. refunds</option>

                    </select>
                  </div>
                </div>
              </div></div>
            {graphCategory === 'customer' && <Chart categories={salesDataCategoreis} series={customerDataSeries} />}
            {graphCategory === 'orders' && <Chart categories={salesDataCategoreis} series={ordersDataSeries} />}

          </div>
        </div>

      </div>
    </div>

  );
}