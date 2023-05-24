import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";

export const ClientSingleView = () => {
    
    const { store, actions } = useContext(Context);
    return (
        <>
        // Button trigger modal
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
            Launch demo modal
            </button>

            {/* Modal  */}
            <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    ...
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div>
            </>
    )
}