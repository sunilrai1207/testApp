import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
export default function FunctionalList() {
    const { functionalAreaList } = useSelector(
        (state) => ({
            functionalAreaList: state.functionalArea.faList,
        }),
        shallowEqual

    );
    return <React.Fragment>

        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="heading">
                        <h1>Functional Areas</h1>
                        <a href="javascript:void(0);">Create New</a>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="search">
                        <div className="form-group has-search">
                            <span className="fa fa-search form-control-feedback"></span>
                            <input type="text" className="form-control" placeholder="Search" />
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="left-crative"><img src="images/login-bg.png" alt="" /></div>
                    <div className="right-crative"><img src="images/login-bg.png" alt="" /></div>
                    <div className="table-row">
                        <ul>
                            {functionalAreaList.map((fa, key)=> {
                                return <li key={key}>
                                <i className="fa fa-ellipsis-h showeditmenu"  ></i>
                                <a href="sub-checklist.html">{fa.functionalAreaName}</a>
                                <div className="showmenu" id={`div${fa.functionalAreaId}`}>
                                  <a href="javascript:void(0);" className="showmenulink" >Edit</a>
                                  <a href="javascript:void(0);" className="showmenulink2">Delete</a>
                                </div>
                              </li>
                            })}
                      </ul>
                    </div>
                    </div>
                </div>
            </div>
    </React.Fragment>
}