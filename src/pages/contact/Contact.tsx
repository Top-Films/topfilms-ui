import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InformationPageWrapper from '../../components/information-page-wrapper/InformationPageWrapper';
import classnames from './contact.module.scss';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Contact() {
	return (
		<InformationPageWrapper>
			<div className={classnames.headerContainer}>
				<FontAwesomeIcon size='4x' icon={faEnvelope} />
				<h1>Contact Top Films</h1>
				<p>Thank you for visiting Top Films! We value your feedback, inquiries, and suggestions.</p>
				<p>Please feel free to reach out to us using the contact information below.</p>
			</div>

			<h2>General Inquiries</h2>
			<ul>
				<li>
					<p>If you have any questions, comments, or concerns about our website, feel free to reach out!</p>
				</li>
			</ul>
			
			<br />

			<h2>Customer Support</h2>
			<ul>
				<li>
					<p>If you have any issues with your account or need help with our services, our dedicated customer support team is here to assist you.</p>
				</li>
			</ul>
			<br />

			<h2>Feedback and Suggestions</h2>
			<ul>
				<li>
					<p>We value your input! If you have suggestions, feedback, or ideas to share, please do so.</p>
				</li>
			</ul>
			<br />

			<h2>Contact Information</h2>
			<ul>
				<li>
					<p>Email: <a href='mailto:maxmorhardt13@gmail.com'>maxmorhardt13@gmail.com</a></p>
				</li>
				<li>
					<p>Feel free to contribute or raise an issue on our <a target='_blank' href='https://github.com/Top-Films' rel='noreferrer'>GitHub Repository</a></p>
				</li>
				<li>
					<p>View our <a target='_blank' href='https://trello.com/b/UwA6fNAw/top-films' rel='noreferrer'>Trello board</a> to see our development progress</p>
				</li>
			</ul>
		</InformationPageWrapper>
	);
}