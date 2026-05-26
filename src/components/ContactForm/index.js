import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import useErrors from "../../hooks/useErros";
import useSafeAsyncState from "../../hooks/useSafeAsyncState";
import CategoriesService from "../../services/CategoriesService";
import formatPhone from "../../utils/formatPhone";
import isEmailValid from "../../utils/isEmailValid";
import Button from "../Button";
import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import { ButtonContainer, Form } from "./styles";

const ContactForm = forwardRef(function ContactForm(
  { buttonLabel, onSubmit },
  ref,
) {
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
    async function loadCategories() {
      try {
        const categories = await CategoriesService.listCategories();

        setCategories(categories);
      } catch {
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
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

  return (
    <>
      <Form onSubmit={handleSubmit} noValidate>
        <FormGroup error={getErrorMessageByFieldName("name")}>
          <Input
            $error={getErrorMessageByFieldName("name")}
            value={name}
            onChange={handleNameChange}
            placeholder="Nome *"
            disabled={isSubmitting}
          />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("email")}>
          <Input
            type="email"
            $error={getErrorMessageByFieldName("email")}
            value={email}
            onChange={handleEmailChange}
            placeholder="E-mail *"
            disabled={isSubmitting}
          />
        </FormGroup>
        <FormGroup>
          <Input
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Telefone"
            maxLength="15"
            disabled={isSubmitting}
          />
        </FormGroup>
        <FormGroup $isLoading={isLoadingCategories}>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={isLoadingCategories || isSubmitting}
          >
            <option value="">Categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormGroup>
        <ButtonContainer>
          <Button
            type="submit"
            disabled={!isFormValid}
            isLoading={isSubmitting}
          >
            {buttonLabel}
          </Button>
        </ButtonContainer>
      </Form>
    </>
  );
});

export default ContactForm;
