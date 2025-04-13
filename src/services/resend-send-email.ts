
import { Logger } from '@/utils/logger';
import { Resend } from 'resend';

type Req = {
	to: string;
	subject: string;
	template: string;
};

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function resendSendEmail(req: Req) {

    const from = 'portfolio@miguelgoncalves.dev';

    const name = 'miguelgoncalves.dev';

	try {
		if (!req.template) {
			throw new Error('TEMPLATE EMPTY');
		}
		if (!req.subject) {
			throw new Error('NO SUBJECT');
		}
		if (!req.to) {
			throw new Error('NO EMAIL TO');
		}

		const response = await resend.emails.send({
			from: `${name} <${from}>`,
			to: req.to,
			subject: req.subject,
			html: req.template,
		});

		if (response.error) {
			throw new Error(JSON.stringify(response.error));
		}

		return {
			status: 200,
		};
	} catch (err) {
		Logger({
			logMessage: err,
			serviceName: 'RESEND_SEND_EMAIL_SERVICE',
			type: 'ERROR',
		});
		return {
			status: 503,
		};
	}
}