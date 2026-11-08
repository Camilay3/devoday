import { AppError } from '../utils/app.error.js';

const buckets = new Map();

function consume(key, windowMs, max) {
	const now = Date.now();
	const current = buckets.get(key);

	if (buckets.size > 10_000) {
		for (const [bucketKey, bucket] of buckets) {
			if (bucket.resetAt <= now) buckets.delete(bucketKey);
		}
	}

	if (!current || current.resetAt <= now) {
		const resetAt = now + windowMs;
		buckets.set(key, { count: 1, resetAt });
		return { allowed: true, resetAt };
	}

	if (current.count >= max) return { allowed: false, resetAt: current.resetAt };

	current.count += 1;
	return { allowed: true, resetAt: current.resetAt };
}

export function rateLimit({ windowMs, max, keyGenerators }) {
	return (req, res, next) => {
		const keys = keyGenerators
			.map((keyGenerator) => keyGenerator(req))
			.filter(Boolean)
			.map((key) => `rate-limit:${key}`);

		const results = keys.map((key) => consume(key, windowMs, max));
		const blocked = results.find((result) => !result.allowed);

		if (!blocked) return next();

		const retryAfter = Math.max(1, Math.ceil((blocked.resetAt - Date.now()) / 1000));
		res.set('Retry-After', String(retryAfter));
		return next(new AppError('Muitas tentativas. Tente novamente mais tarde.', 429));
	};
}

export const ipKey = (req) => req.ip;
export const emailKey = (req) => req.body?.email || req.params?.email;
