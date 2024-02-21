const Permission = {
	GET_IMAGE_LIST: {
		type: 'GET_IMAGE_LIST',
		name: 'Получение списка изображений'
	}
};

type PermissionKeys = keyof typeof Permission;

export{
	Permission,
	PermissionKeys
};