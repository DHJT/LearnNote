function showSuccessToast(content) {
	require(['toastr'], function(toastr) {
		toastr.options = {
			"closeButton" : true,
			"debug" : false,
			"progressBar" : false,
			"positionClass" : "toast-bottom-right",
			"preventDuplicates" : false,
			"onclick" : null,
			"showDuration" : "300",
			"hideDuration" : "1000",
			"timeOut" : "3000",
			"extendedTimeOut" : "1000",
			"showEasing" : "swing",
			"hideEasing" : "linear",
			"showMethod" : "fadeIn",
			"hideMethod" : "fadeOut"
		}
		toastr.success(content, '成功')
	})
}
function showErrorToast(content) {
	toastr.options = {
		"closeButton" : true,
		"debug" : false,
		"progressBar" : false,
		"positionClass" : "toast-bottom-right",
		"preventDuplicates" : false,
		"onclick" : null,
		"showDuration" : "300",
		"hideDuration" : "1000",
		"timeOut" : "3000",
		"extendedTimeOut" : "1000",
		"showEasing" : "swing",
		"hideEasing" : "linear",
		"showMethod" : "fadeIn",
		"hideMethod" : "fadeOut"
	}
	toastr.error(content, '错误')
}
function showInfoToast(content) {
	toastr.options = {
		"closeButton" : true,
		"debug" : false,
		"progressBar" : false,
		"positionClass" : "toast-bottom-right",
		"preventDuplicates" : false,
		"onclick" : null,
		"showDuration" : "300",
		"hideDuration" : "1000",
		"timeOut" : "3000",
		"extendedTimeOut" : "1000",
		"showEasing" : "swing",
		"hideEasing" : "linear",
		"showMethod" : "fadeIn",
		"hideMethod" : "fadeOut"
	}
	toastr.info(content, '提示')
}
function showWarningToast(content) {
	toastr.options = {
		"closeButton" : true,
		"debug" : false,
		"progressBar" : false,
		"positionClass" : "toast-bottom-right",
		"preventDuplicates" : false,
		"onclick" : null,
		"showDuration" : "300",
		"hideDuration" : "1000",
		"timeOut" : "3000",
		"extendedTimeOut" : "1000",
		"showEasing" : "swing",
		"hideEasing" : "linear",
		"showMethod" : "fadeIn",
		"hideMethod" : "fadeOut"
	}
	toastr.warning(content, '警告')
}