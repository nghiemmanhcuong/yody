import React from 'react';
import PropTypes from 'prop-types';

import {IoClose} from 'react-icons/io5';

import Grid from './Grid';

const SendEvaluate = (props) => {
    return (
        <div className='send-evaluate'>
            <div className='send-evaluate_header'>
                <p>Đánh giá sản phẩm</p>    
                <h5>{props.productName}</h5>
            </div>
            <div className='send-evaluate_form'>
                <div className='send-evaluate_form_item'>
                    <p>Đánh giá của bạn về sản phẩm:</p>
                    <div className='send-evaluate_form_starts'>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-fill'></i>
                        <i className='bi bi-star-fill'></i>
                    </div>
                </div>
                <div className='send-evaluate_form_input'>
                    <input type='text' placeholder='Nhập tên của bạn' />
                </div>
                <Grid col={2} gap={10}>
                    <div className='send-evaluate_form_input'>
                        <input type='text' placeholder='Địa chỉ email' />
                    </div>
                    <div className='send-evaluate_form_input'>
                        <input type='text' placeholder='Số điện thoại (Nếu có)' />
                    </div>
                </Grid>
                <div className='send-evaluate_form_input'>
                    <textarea
                        placeholder='Nhập nội dung đánh giá của bạn về sản phẩm này'
                        cols='30'
                        rows='3'
                    ></textarea>
                </div>
                <div className='send-evaluate_form_input'>
                    <label htmlFor='inputFile'>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'>
                            <path d='M 4 5 C 2.895 5 2 5.895 2 7 L 2 23 C 2 24.105 2.895 25 4 25 L 14.230469 25 C 14.083469 24.356 14 23.688 14 23 C 14 22.662 14.021594 22.329 14.058594 22 L 5 22 L 5 15 L 7.2890625 12.710938 C 8.2340625 11.765937 9.7659375 11.765937 10.710938 12.710938 L 15.720703 17.720703 C 17.356703 15.469703 20.004 14 23 14 C 24.851 14 26.57 14.559578 28 15.517578 L 28 7 C 28 5.895 27.105 5 26 5 L 4 5 z M 23 8 C 24.105 8 25 8.895 25 10 C 25 11.105 24.105 12 23 12 C 21.895 12 21 11.105 21 10 C 21 8.895 21.895 8 23 8 z M 23 16 C 19.134 16 16 19.134 16 23 C 16 26.866 19.134 30 23 30 C 26.866 30 30 26.866 30 23 C 30 19.134 26.866 16 23 16 z M 23 19 C 23.552 19 24 19.447 24 20 L 24 22 L 26 22 C 26.552 22 27 22.447 27 23 C 27 23.553 26.552 24 26 24 L 24 24 L 24 26 C 24 26.553 23.552 27 23 27 C 22.448 27 22 26.553 22 26 L 22 24 L 20 24 C 19.448 24 19 23.553 19 23 C 19 22.447 19.448 22 20 22 L 22 22 L 22 20 C 22 19.447 22.448 19 23 19 z'></path>
                        </svg>
                        <span>Đính kèm hình ảnh (chọn tối đa 3 hình)</span>
                    </label>
                    <input type='file' id='inputFile' hidden/>
                </div>
                <div className='send-evaluate_form_btn'>
                    <button>
                        Gửi đánh giá
                    </button>
                </div>
            </div>
            <div className='send-evaluate_close' onClick={() => props.onSetActiveEvaluate(false)}>
                <IoClose size={32}/>
            </div>
        </div>
    );
};

SendEvaluate.propTypes = {
    productName: PropTypes.string.isRequired,
    onSetActiveEvaluate:PropTypes.func.isRequired,
};

export default SendEvaluate;
