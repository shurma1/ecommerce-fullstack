import {typedSchema} from '../utils/typedSchema';
import {name} from './fields/name';
import {description} from './fields/description';
import {imageId} from './fields/imageId';
import {weight} from './fields/weight';
import {height} from './fields/height';
import {length} from './fields/length';
import {price} from './fields/price';
import {brandId} from './fields/brandId';
import {typeId} from './fields/typeId';

export const productSchema = () => {
	return typedSchema({
		name: name,
		description: description,
		imageId: imageId(true),
		weight: weight,
		height: height,
		length: length,
		price: price(),
		oldPrice: price(true),
		typeId: typeId(),
		brandId: brandId(),
	});
};
