import {RouteMapping} from './route-mapping';
import {TRouteMappingItem, TRouteMappingItems} from './route-mapping-interface';

const MIN_ITEM_LENGTH = 2;

export function isSecondary(item: TRouteMappingItem): boolean {
	return item.url.split('/').length > MIN_ITEM_LENGTH;
}

export function prepareItems(items: TRouteMappingItems): TRouteMappingItems {
	return items.map(item => {
		if (typeof item.isSecondary === 'undefined') {
			return {...item, isSecondary: isSecondary(item)};
		}
		return item;
	});
}

export function getRouteById(id: string): TRouteMappingItem | undefined {
	return RouteMapping.find(item => item.id === id);
}

export function getRouteByUrl(url: string): TRouteMappingItem | undefined {
	return RouteMapping.find(item => item.url === url);
}
