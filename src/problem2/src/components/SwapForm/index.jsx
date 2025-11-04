import React, { useEffect, useState } from "react";
import { Box, InputAdornment, Stack } from "@mui/material";
import { Autorenew } from "@mui/icons-material";
import { StyledTextField, StyledButton } from "./styled";
import { useFetchDummy } from "../../hooks/useFetchDummy";
import "./index.css";
import { NumericFormatCustom } from "../NumericFormatCustom";
import { Confirm } from "../Modal";

const SwapForm = () => {
  const [sourceCurrency, setSourceCurrency] = useState(null);
  const [targetCurrency, setTargetCurrency] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { currencies, balance, error, loading } = useFetchDummy();
  const [inputAmount, setInputAmount] = useState(0);
  const [outputAmount, setOutputAmount] = useState(0);

  useEffect(() => {
    if (currencies) {
      setSourceCurrency(currencies[0]);
      setTargetCurrency(currencies[1]);
    }
  }, [currencies]);

  const handleSwapCurrencies = () => {
    const temp = sourceCurrency;
    setSourceCurrency(targetCurrency);
    setTargetCurrency(temp);

    const tempAmount = inputAmount;
    setInputAmount(outputAmount);
    setOutputAmount(tempAmount);
  };

  const calculateAmount = (type) => {
    if (!sourceCurrency?.price || !targetCurrency?.price) return;
    switch (type) {
      case "input":
        setOutputAmount(inputAmount / sourceCurrency?.price * targetCurrency?.price);
        break;
      case "output":
        setInputAmount(outputAmount / targetCurrency?.price * sourceCurrency?.price);
        break;
    }
  };

  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleModalOnOk = () => {
    setIsConfirmModalOpen(false);
  };

  const handleModalOnCancel = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <Box className="swap-form-container">
        <Stack alignItems="center" className="swap-form-content">
          <Stack className="swap-form-input-container">
            <Stack className="swap-form-input-header" direction="row" justifyContent="space-between">
              <Box className="swap-form-input-header-left-text">Pay</Box>
              <Box>Balance: {balance?.[sourceCurrency?.symbol] || "-"} {sourceCurrency?.symbol}</Box>
            </Stack>
            <StyledTextField
              id="input-amount"
              type="text"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={`/${sourceCurrency?.logo}`} width={24} height={24} />
                    </InputAdornment>
                  ),
                  inputComponent: NumericFormatCustom,
                  inputProps: {
                    min: 0,
                    max: balance?.[sourceCurrency?.symbol],
                    value: inputAmount,
                  },
                },
              }}
              onChange={
                (e) => {
                  setInputAmount(Number(e?.target?.value));
                  calculateAmount("input");
                }
              }
            />
          </Stack>
          <Box className="swap-form-swap-icon" onClick={handleSwapCurrencies}>
            <Autorenew fontSize="large" />
          </Box>
          <Stack className="swap-form-input-container">
            <Stack className="swap-form-input-header" direction="row" justifyContent="space-between">
              <Box className="swap-form-input-header-left-text">Receive</Box>
              <Box>Balance: {balance?.[targetCurrency?.symbol] || "-"} {targetCurrency?.symbol}</Box>
            </Stack>
            <StyledTextField
              id="output-amount"
              type="text"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={`/${targetCurrency?.logo}`} width={24} height={24} />
                    </InputAdornment>
                  ),
                  inputComponent: NumericFormatCustom,
                  inputProps: {
                    min: 0,
                    max: balance?.[targetCurrency?.symbol],
                    value: outputAmount,
                  },
                },
              }}
              onChange={
                (e) => {
                  setOutputAmount(Number(e?.target?.value));
                  calculateAmount("output");
                }
              }
            />
          </Stack>
        </Stack>
        <StyledButton variant="contained" onClick={handleOpenConfirmModal}>CONFIRM SWAP</StyledButton>
      </Box>
      {isConfirmModalOpen && <Confirm onOk={handleModalOnOk} onCancel={handleModalOnCancel} />}
    </>
  );
};
export default SwapForm;
