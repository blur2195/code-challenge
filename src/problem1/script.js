var sum_to_n_a = function(n) {
    if (n < 2) return n;
    return n * (n + 1) / 2;
};

var sum_to_n_b = function(n) {
    if (n < 2) return n;
    let sum = 0;
    for (let i = 1; i <= n; i++) sum += i;
    return sum;
};

var sum_to_n_c = function(n) {
    if (n < 2) return n;
    return n + sum_to_n_c(n - 1);
};

var sum_to_n_d = function(n) {
    if (n < 2) return n;
    return Array.from({ length: n }, (_, i) => i + 1)
        .reduce((acc, curr) => acc + curr, 0);
};