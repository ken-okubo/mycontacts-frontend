import { useEffect, useImperativeHandle, useState } from "react";
import useErrors from "../../hooks/useErros";
import useSafeAsyncState from "../../hooks/useSafeAsyncState";
import CategoriesService from "../../services/CategoriesService";
import formatPhone from "../../utils/formatPhone";
import isEmailValid from "../../utils/isEmailValid";

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      setFieldsValues: (contact) => {
        setName(contact.name ?? "");
        setEmail(contact.email ?? "");
        setPhone(formatPhone(contact.phone ?? ""));
        setCategoryId(contact.category.id ?? "");
      },
      resetFields: () => {
        setName("");
        setEmail("");
        setPhone("");
        setCategoryId("");
      },
    };
  }, []);

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors();

  const isFormValid = name && errors.length === 0;

  useEffect(() => {
    const controller = new AbortController();
    async function loadCategories() {
      try {
        const categories = await CategoriesService.listCategories(
          controller.signal,
        );

        setCategories(categories);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();

    return () => {
      controller.abort();
    };
  }, [setCategories, setIsLoadingCategories]);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: "name", message: "O nome é obrigatório" });
    } else {
      removeError("name");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: "email", message: "O e-mail é inválido" });
    } else {
      removeError("email");
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name,
      email,
      phone,
      categoryId,
    });

    setIsSubmitting(false);
  }
  return {
    name,
    email,
    phone,
    categoryId,
    categories,
    isLoadingCategories,
    isSubmitting,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    handleSubmit,
    getErrorMessageByFieldName,
    setCategoryId,
    isFormValid,
  };
}
