import { forwardRef } from "react";
import Button from "../Button";
import FormGroup from "../FormGroup";
import Input from "../Input";
import Select from "../Select";
import { ButtonContainer, Form } from "./styles";
import useContactForm from "./useContactForm";

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
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
  } = useContactForm(onSubmit, ref);

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
