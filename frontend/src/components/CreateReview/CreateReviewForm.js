import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createReviewForSpot } from '../../store/reviews';
import './CreateReviewForm.css';


function CreateReviewForm({ spot, setShowModal }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const errors = [];

        if (!review.length) errors.push("Review is required");
        if (!stars || stars < 0 || stars > 5) errors.push("Star rating must be between 1 and 5");

        setValidationErrors(errors);

        if (!errors.length) {
            try {
                await dispatch(createReviewForSpot(review, stars, spot.id, sessionUser));
                alert("Review successfully created!");
                setShowModal(false);
            } catch(e) {
                // console.log('e.json', e.json)
                const response = await e.json();
                // console.log('response', response);
                const otherErrors = errors.slice();
                otherErrors.push(response.message);
                setValidationErrors(otherErrors);
            }
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={submitHandler}>
                <h2>Write your review</h2>
                {validationErrors.length > 0 &&
                validationErrors.map(error => 
                    <li key={error}>{error}</li>
                )}
                <input 
                type="text"
                onChange={e => {
                    setValidationErrors([]);
                    setReview(e.target.value)
                }}
                value={review}
                placeholder="Your... Review... Here..."
                />
                <input 
                type="number"
                onChange={e => {
                    setValidationErrors([]);
                    setStars(e.target.value)
                }}
                value={stars}
                min="1"
                max="5"
                placeholder="Star Rating"/>
                <button
                disabled={!!validationErrors.length}
                className="submit-button">
                    Submit Review
                </button>
            </form>
        </div>
    )
}



export default CreateReviewForm; 