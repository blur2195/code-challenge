# Type Errors
1. Interface **WalletBalance** has no **blockchain** field.
2. **FormattedWalletBalance** should extend **WalletBalance** with **formatted: string;**.
3. **BoxProps**, **useWalletBalances**, **usePrices** is not defined (must be imported from other files, but not showed).
4. **getPriority(blockchain: any)** should not use _any_.

# Logical Errors
1. Line 37-38: **lhsPriority** is used but not defined, **balancePriority** is defined but not used.
2. Line 39: Filter condition keeps balances with _amount <= 0_ might be wrong.
3. Line 47-51: Sort function might returns nothing when _leftPriority = rightPriority_, so the sorted list might not return as expected sometimes.
4. Line 53: _prices_ is used as **useMemo** dependencies, but not used in the function -> might be error.
5. Line 55: **formattedBalances** is defined but not used.
5. Line 62: **balance** is declared as **FormattedWalletBalance**, but got mapped from **sortedBalances**, which is declared as array of **WalletBalance**. So **balance** might not have **formatted** field.

# Performance
1. **getPriority** is a helper function, defined inside component and got recreated every re-render, which is not necessary.
   Should define outside the component, or use **useCallback**.
2. **formattedBalances** and **sortedBalances** both map/filter from the same array, should combine.
3. Line 67: Using array index as _key_, might get unneccessary re-render when order change. Should use unique value like _currency_.
4. Should use **useMemo** for rows or memoized <WalletRow />.
5. _prices[balance.currency]_ mgiht be _undefined_, should have fallback to avoid error.
