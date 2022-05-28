import { Router } from 'express';
import { AdRecord } from '../records/ad-record';

export const adRouter = Router();

adRouter
	.get('/search/:name?', async (req, res) => {
		const ads = await AdRecord.findAll(req.params.name ?? '');
		res.json(ads);
	})

	.get('/search-by-loc/:lat?/:lot?', async (req, res) => {
		const locAndAds = await AdRecord.findGeoLoc(Number(req.params.lat), Number(req.params.lot));
		res.json(locAndAds);
	})

	.get('/:id?', async (req, res) => {
		const ad = await AdRecord.getOne(req.params.id);
		res.json(ad);
	})

	.post('/', async (req, res) => {
		const ad = new AdRecord({...req.body, price: Number(req.body.price)});
		await ad.insert();
		res.json(ad);
	});
