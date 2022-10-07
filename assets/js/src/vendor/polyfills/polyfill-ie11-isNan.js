if (!Number.isNan) {
    Object.defineProperty(Number, 'isNaN', {
        value: function(value) {
            return value !== value;
        },
    });
}
