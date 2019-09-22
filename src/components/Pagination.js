import React, { Component } from 'react';

class Pagination extends Component {
    constructor(props) {
        super(props);
        const {
            totalRecords = null,
            pageLimit = 20,
            pageNeighbors = 0
        } = props;
        this.totalPages = Math.ceil(this.totalRecords / this.pageLimit) - 1;
        this.state = {
            currentPage : 0
        };
    }

    
}

export default Pagination;