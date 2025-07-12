--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-07-07 16:12:43

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 20775)
-- Name: ceragen; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA ceragen;


ALTER SCHEMA ceragen OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 20777)
-- Name: admin_client; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_client (
    cli_id integer NOT NULL,
    cli_person_id integer,
    cli_identification character varying(13),
    cli_name character varying(100),
    cli_address_bill character varying(200),
    cli_mail_bill character varying(100),
    cli_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_client OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 20776)
-- Name: admin_client_cli_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_client_cli_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_client_cli_id_seq OWNER TO postgres;

--
-- TOC entry 5372 (class 0 OID 0)
-- Dependencies: 218
-- Name: admin_client_cli_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_client_cli_id_seq OWNED BY ceragen.admin_client.cli_id;


--
-- TOC entry 221 (class 1259 OID 20787)
-- Name: admin_expense; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_expense (
    exp_id integer NOT NULL,
    exp_type_id integer,
    exp_payment_method_id integer,
    exp_date timestamp without time zone,
    exp_amount numeric(12,2),
    exp_description character varying(200),
    exp_receipt_number character varying(100),
    exp_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_expense OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 20786)
-- Name: admin_expense_exp_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_expense_exp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_expense_exp_id_seq OWNER TO postgres;

--
-- TOC entry 5373 (class 0 OID 0)
-- Dependencies: 220
-- Name: admin_expense_exp_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_expense_exp_id_seq OWNED BY ceragen.admin_expense.exp_id;


--
-- TOC entry 223 (class 1259 OID 20797)
-- Name: admin_expense_type; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_expense_type (
    ext_id integer NOT NULL,
    ext_name character varying(40),
    ext_description character varying(100),
    ext_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_expense_type OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 20796)
-- Name: admin_expense_type_ext_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_expense_type_ext_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_expense_type_ext_id_seq OWNER TO postgres;

--
-- TOC entry 5374 (class 0 OID 0)
-- Dependencies: 222
-- Name: admin_expense_type_ext_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_expense_type_ext_id_seq OWNED BY ceragen.admin_expense_type.ext_id;


--
-- TOC entry 225 (class 1259 OID 20805)
-- Name: admin_invoice; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_invoice (
    inv_id integer NOT NULL,
    inv_number character varying(20),
    inv_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    inv_client_id integer,
    inv_patient_id integer,
    inv_subtotal numeric(10,2),
    inv_discount numeric(10,2) DEFAULT 0,
    inv_tax numeric(10,2) DEFAULT 0,
    inv_grand_total numeric(10,2),
    inv_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_invoice OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 20818)
-- Name: admin_invoice_detail; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_invoice_detail (
    ind_id integer NOT NULL,
    ind_invoice_id integer,
    ind_product_id integer,
    ind_quantity integer,
    ind_unit_price numeric(10,2),
    ind_total numeric(10,2),
    ind_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_invoice_detail OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 20817)
-- Name: admin_invoice_detail_ind_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_invoice_detail_ind_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_invoice_detail_ind_id_seq OWNER TO postgres;

--
-- TOC entry 5375 (class 0 OID 0)
-- Dependencies: 226
-- Name: admin_invoice_detail_ind_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_invoice_detail_ind_id_seq OWNED BY ceragen.admin_invoice_detail.ind_id;


--
-- TOC entry 224 (class 1259 OID 20804)
-- Name: admin_invoice_inv_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_invoice_inv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_invoice_inv_id_seq OWNER TO postgres;

--
-- TOC entry 5376 (class 0 OID 0)
-- Dependencies: 224
-- Name: admin_invoice_inv_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_invoice_inv_id_seq OWNED BY ceragen.admin_invoice.inv_id;


--
-- TOC entry 229 (class 1259 OID 20826)
-- Name: admin_invoice_payment; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_invoice_payment (
    inp_id integer NOT NULL,
    inp_invoice_id integer,
    inp_payment_method_id integer,
    inp_amount numeric(10,2),
    inp_reference character varying(100),
    inp_proof_image_path text,
    inp_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_invoice_payment OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 20825)
-- Name: admin_invoice_payment_inp_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_invoice_payment_inp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_invoice_payment_inp_id_seq OWNER TO postgres;

--
-- TOC entry 5377 (class 0 OID 0)
-- Dependencies: 228
-- Name: admin_invoice_payment_inp_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_invoice_payment_inp_id_seq OWNED BY ceragen.admin_invoice_payment.inp_id;


--
-- TOC entry 231 (class 1259 OID 20836)
-- Name: admin_invoice_tax; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_invoice_tax (
    int_id integer NOT NULL,
    int_invoice_id integer,
    int_tax_id integer,
    int_tax_amount numeric(10,2),
    int_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_invoice_tax OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 20835)
-- Name: admin_invoice_tax_int_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_invoice_tax_int_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_invoice_tax_int_id_seq OWNER TO postgres;

--
-- TOC entry 5378 (class 0 OID 0)
-- Dependencies: 230
-- Name: admin_invoice_tax_int_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_invoice_tax_int_id_seq OWNED BY ceragen.admin_invoice_tax.int_id;


--
-- TOC entry 233 (class 1259 OID 20844)
-- Name: admin_marital_status; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_marital_status (
    id integer NOT NULL,
    status_name character varying(100),
    state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_marital_status OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 20843)
-- Name: admin_marital_status_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_marital_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_marital_status_id_seq OWNER TO postgres;

--
-- TOC entry 5379 (class 0 OID 0)
-- Dependencies: 232
-- Name: admin_marital_status_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_marital_status_id_seq OWNED BY ceragen.admin_marital_status.id;


--
-- TOC entry 235 (class 1259 OID 20852)
-- Name: admin_medic_person_type; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_medic_person_type (
    mpt_id integer NOT NULL,
    mpt_name character varying(30),
    mpt_description character varying(80),
    mpt_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_medic_person_type OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 20851)
-- Name: admin_medic_person_type_mpt_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_medic_person_type_mpt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_medic_person_type_mpt_id_seq OWNER TO postgres;

--
-- TOC entry 5380 (class 0 OID 0)
-- Dependencies: 234
-- Name: admin_medic_person_type_mpt_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_medic_person_type_mpt_id_seq OWNED BY ceragen.admin_medic_person_type.mpt_id;


--
-- TOC entry 237 (class 1259 OID 20860)
-- Name: admin_medical_staff; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_medical_staff (
    med_id integer NOT NULL,
    med_person_id integer,
    med_type_id integer,
    med_registration_number character varying(50),
    med_specialty character varying(100),
    med_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_medical_staff OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 20859)
-- Name: admin_medical_staff_med_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_medical_staff_med_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_medical_staff_med_id_seq OWNER TO postgres;

--
-- TOC entry 5381 (class 0 OID 0)
-- Dependencies: 236
-- Name: admin_medical_staff_med_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_medical_staff_med_id_seq OWNED BY ceragen.admin_medical_staff.med_id;


--
-- TOC entry 239 (class 1259 OID 20868)
-- Name: admin_parameter_list; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_parameter_list (
    pli_id integer NOT NULL,
    pli_code_parameter character varying(100),
    pli_is_numeric_return_value boolean DEFAULT true,
    pli_string_value_return character varying(100),
    pli_numeric_value_return numeric(8,2),
    pli_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_parameter_list OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 20867)
-- Name: admin_parameter_list_pli_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_parameter_list_pli_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_parameter_list_pli_id_seq OWNER TO postgres;

--
-- TOC entry 5382 (class 0 OID 0)
-- Dependencies: 238
-- Name: admin_parameter_list_pli_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_parameter_list_pli_id_seq OWNED BY ceragen.admin_parameter_list.pli_id;


--
-- TOC entry 241 (class 1259 OID 20879)
-- Name: admin_patient; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_patient (
    pat_id integer NOT NULL,
    pat_person_id integer,
    pat_client_id integer,
    pat_code character varying(20),
    pat_medical_conditions text,
    pat_allergies text,
    pat_blood_type integer,
    pat_emergency_contact_name character varying(100),
    pat_emergency_contact_phone character varying(20),
    pat_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_patient OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 20878)
-- Name: admin_patient_pat_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_patient_pat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_patient_pat_id_seq OWNER TO postgres;

--
-- TOC entry 5383 (class 0 OID 0)
-- Dependencies: 240
-- Name: admin_patient_pat_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_patient_pat_id_seq OWNED BY ceragen.admin_patient.pat_id;


--
-- TOC entry 243 (class 1259 OID 20891)
-- Name: admin_payment_method; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_payment_method (
    pme_id integer NOT NULL,
    pme_name character varying(40),
    pme_description character varying(100),
    pme_require_references boolean DEFAULT false,
    pme_require_picture_proff boolean DEFAULT false,
    pme_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_payment_method OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 20890)
-- Name: admin_payment_method_pme_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_payment_method_pme_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_payment_method_pme_id_seq OWNER TO postgres;

--
-- TOC entry 5384 (class 0 OID 0)
-- Dependencies: 242
-- Name: admin_payment_method_pme_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_payment_method_pme_id_seq OWNED BY ceragen.admin_payment_method.pme_id;


--
-- TOC entry 245 (class 1259 OID 20901)
-- Name: admin_person; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_person (
    per_id integer NOT NULL,
    per_identification character varying(20),
    per_names character varying(100),
    per_surnames character varying(100),
    per_genre_id integer,
    per_marital_status_id integer,
    per_country character varying(100),
    per_city character varying(100),
    per_address character varying(200),
    per_phone character varying(100),
    per_mail character varying(100),
    per_birth_date timestamp without time zone,
    per_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_person OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 20913)
-- Name: admin_person_genre; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_person_genre (
    id integer NOT NULL,
    genre_name character varying(100),
    state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_person_genre OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 20912)
-- Name: admin_person_genre_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_person_genre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_person_genre_id_seq OWNER TO postgres;

--
-- TOC entry 5385 (class 0 OID 0)
-- Dependencies: 246
-- Name: admin_person_genre_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_person_genre_id_seq OWNED BY ceragen.admin_person_genre.id;


--
-- TOC entry 244 (class 1259 OID 20900)
-- Name: admin_person_per_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_person_per_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_person_per_id_seq OWNER TO postgres;

--
-- TOC entry 5386 (class 0 OID 0)
-- Dependencies: 244
-- Name: admin_person_per_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_person_per_id_seq OWNED BY ceragen.admin_person.per_id;


--
-- TOC entry 249 (class 1259 OID 20921)
-- Name: admin_product; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_product (
    pro_id integer NOT NULL,
    pro_code character varying(20),
    pro_name character varying(100),
    pro_description text,
    pro_price numeric(10,2),
    pro_total_sessions integer,
    pro_duration_days integer,
    pro_image_url character varying(200),
    pro_therapy_type_id integer,
    pro_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_product OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 20920)
-- Name: admin_product_pro_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_product_pro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_product_pro_id_seq OWNER TO postgres;

--
-- TOC entry 5387 (class 0 OID 0)
-- Dependencies: 248
-- Name: admin_product_pro_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_product_pro_id_seq OWNED BY ceragen.admin_product.pro_id;


--
-- TOC entry 251 (class 1259 OID 20933)
-- Name: admin_product_promotion; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_product_promotion (
    ppr_id integer NOT NULL,
    ppr_product_id integer,
    ppr_name character varying(100),
    ppr_description text,
    ppr_discount_percent numeric(5,2) DEFAULT 0,
    ppr_extra_sessions integer DEFAULT 0,
    ppr_start_date date,
    ppr_end_date date,
    ppr_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_product_promotion OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 20932)
-- Name: admin_product_promotion_ppr_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_product_promotion_ppr_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_product_promotion_ppr_id_seq OWNER TO postgres;

--
-- TOC entry 5388 (class 0 OID 0)
-- Dependencies: 250
-- Name: admin_product_promotion_ppr_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_product_promotion_ppr_id_seq OWNED BY ceragen.admin_product_promotion.ppr_id;


--
-- TOC entry 253 (class 1259 OID 20945)
-- Name: admin_tax; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_tax (
    tax_id integer NOT NULL,
    tax_name character varying(50),
    tax_percentage numeric(5,2),
    tax_description text,
    tax_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_tax OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 20944)
-- Name: admin_tax_tax_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_tax_tax_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_tax_tax_id_seq OWNER TO postgres;

--
-- TOC entry 5389 (class 0 OID 0)
-- Dependencies: 252
-- Name: admin_tax_tax_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_tax_tax_id_seq OWNED BY ceragen.admin_tax.tax_id;


--
-- TOC entry 255 (class 1259 OID 20955)
-- Name: admin_therapy_type; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.admin_therapy_type (
    tht_id integer NOT NULL,
    tht_name character varying(50),
    tht_description text,
    tht_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.admin_therapy_type OWNER TO postgres;

--
-- TOC entry 254 (class 1259 OID 20954)
-- Name: admin_therapy_type_tht_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.admin_therapy_type_tht_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.admin_therapy_type_tht_id_seq OWNER TO postgres;

--
-- TOC entry 5390 (class 0 OID 0)
-- Dependencies: 254
-- Name: admin_therapy_type_tht_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.admin_therapy_type_tht_id_seq OWNED BY ceragen.admin_therapy_type.tht_id;


--
-- TOC entry 257 (class 1259 OID 20965)
-- Name: audi_sql_events_register; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.audi_sql_events_register (
    ser_id integer NOT NULL,
    ser_table_id integer,
    ser_sql_command_type character varying(20),
    ser_new_record_detail character varying(1000),
    ser_old_record_detail character varying(1000),
    ser_user_process_id integer,
    ser_date_event timestamp without time zone
);


ALTER TABLE ceragen.audi_sql_events_register OWNER TO postgres;

--
-- TOC entry 256 (class 1259 OID 20964)
-- Name: audi_sql_events_register_ser_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.audi_sql_events_register_ser_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.audi_sql_events_register_ser_id_seq OWNER TO postgres;

--
-- TOC entry 5391 (class 0 OID 0)
-- Dependencies: 256
-- Name: audi_sql_events_register_ser_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.audi_sql_events_register_ser_id_seq OWNED BY ceragen.audi_sql_events_register.ser_id;


--
-- TOC entry 259 (class 1259 OID 20974)
-- Name: audi_tables; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.audi_tables (
    aut_id integer NOT NULL,
    aut_table_name character varying(100),
    aut_table_descriptiom character varying(300),
    aut_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.audi_tables OWNER TO postgres;

--
-- TOC entry 258 (class 1259 OID 20973)
-- Name: audi_tables_aut_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.audi_tables_aut_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.audi_tables_aut_id_seq OWNER TO postgres;

--
-- TOC entry 5392 (class 0 OID 0)
-- Dependencies: 258
-- Name: audi_tables_aut_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.audi_tables_aut_id_seq OWNED BY ceragen.audi_tables.aut_id;


--
-- TOC entry 261 (class 1259 OID 20984)
-- Name: clinic_allergy_catalog; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.clinic_allergy_catalog (
    al_id integer NOT NULL,
    al_name character varying(100),
    al_description text,
    al_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.clinic_allergy_catalog OWNER TO postgres;

--
-- TOC entry 260 (class 1259 OID 20983)
-- Name: clinic_allergy_catalog_al_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.clinic_allergy_catalog_al_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.clinic_allergy_catalog_al_id_seq OWNER TO postgres;

--
-- TOC entry 5393 (class 0 OID 0)
-- Dependencies: 260
-- Name: clinic_allergy_catalog_al_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.clinic_allergy_catalog_al_id_seq OWNED BY ceragen.clinic_allergy_catalog.al_id;


--
-- TOC entry 291 (class 1259 OID 21134)
-- Name: clinic_blood_type; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.clinic_blood_type (
    btp_id integer NOT NULL,
    btp_type character varying(3),
    btp_description text,
    btp_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.clinic_blood_type OWNER TO postgres;

--
-- TOC entry 290 (class 1259 OID 21133)
-- Name: clinic_blood_type_btp_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.clinic_blood_type_btp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.clinic_blood_type_btp_id_seq OWNER TO postgres;

--
-- TOC entry 5394 (class 0 OID 0)
-- Dependencies: 290
-- Name: clinic_blood_type_btp_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.clinic_blood_type_btp_id_seq OWNED BY ceragen.clinic_blood_type.btp_id;


--
-- TOC entry 293 (class 1259 OID 21146)
-- Name: clinic_consent_record; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.clinic_consent_record (
    con_id integer NOT NULL,
    con_patient_id integer,
    con_type character varying(50),
    con_signed_by character varying(100),
    con_signed_date date,
    con_relationship character varying(50),
    con_notes text,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.clinic_consent_record OWNER TO postgres;

--
-- TOC entry 292 (class 1259 OID 21145)
-- Name: clinic_consent_record_con_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.clinic_consent_record_con_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.clinic_consent_record_con_id_seq OWNER TO postgres;

--
-- TOC entry 5395 (class 0 OID 0)
-- Dependencies: 292
-- Name: clinic_consent_record_con_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.clinic_consent_record_con_id_seq OWNED BY ceragen.clinic_consent_record.con_id;


--
-- TOC entry 263 (class 1259 OID 20994)
-- Name: clinic_disease_catalog; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.clinic_disease_catalog (
    dis_id integer NOT NULL,
    dis_name character varying(100),
    dis_description text,
    dis_type_id integer,
    dis_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.clinic_disease_catalog OWNER TO postgres;

--
-- TOC entry 262 (class 1259 OID 20993)
-- Name: clinic_disease_catalog_dis_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.clinic_disease_catalog_dis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.clinic_disease_catalog_dis_id_seq OWNER TO postgres;

--
-- TOC entry 5396 (class 0 OID 0)
-- Dependencies: 262
-- Name: clinic_disease_catalog_dis_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.clinic_disease_catalog_dis_id_seq OWNED BY ceragen.clinic_disease_catalog.dis_id;


--
-- TOC entry 265 (class 1259 OID 21004)
-- Name: clinic_disease_type; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.clinic_disease_type (
    dst_id integer NOT NULL,
    dst_name character varying(100),
    dst_description text,
    dst_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.clinic_disease_type OWNER TO postgres;

--
-- TOC entry 264 (class 1259 OID 21003)
-- Name: clinic_disease_type_dst_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.clinic_disease_type_dst_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.clinic_disease_type_dst_id_seq OWNER TO postgres;

--
-- TOC entry 5397 (class 0 OID 0)
-- Dependencies: 264
-- Name: clinic_disease_type_dst_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.clinic_disease_type_dst_id_seq OWNED BY ceragen.clinic_disease_type.dst_id;


--
-- TOC entry 267 (class 1259 OID 21014)
-- Name: clinic_patient_allergy; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.clinic_patient_allergy (
    pa_id integer NOT NULL,
    pa_patient_id integer,
    pa_allergy_id integer,
    pa_reaction_description text,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.clinic_patient_allergy OWNER TO postgres;

--
-- TOC entry 266 (class 1259 OID 21013)
-- Name: clinic_patient_allergy_pa_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.clinic_patient_allergy_pa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.clinic_patient_allergy_pa_id_seq OWNER TO postgres;

--
-- TOC entry 5398 (class 0 OID 0)
-- Dependencies: 266
-- Name: clinic_patient_allergy_pa_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.clinic_patient_allergy_pa_id_seq OWNED BY ceragen.clinic_patient_allergy.pa_id;


--
-- TOC entry 269 (class 1259 OID 21023)
-- Name: clinic_patient_disease; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.clinic_patient_disease (
    pd_id integer NOT NULL,
    pd_patient_id integer,
    pd_disease_id integer,
    pd_is_current boolean DEFAULT true,
    pd_notes text,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.clinic_patient_disease OWNER TO postgres;

--
-- TOC entry 268 (class 1259 OID 21022)
-- Name: clinic_patient_disease_pd_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.clinic_patient_disease_pd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.clinic_patient_disease_pd_id_seq OWNER TO postgres;

--
-- TOC entry 5399 (class 0 OID 0)
-- Dependencies: 268
-- Name: clinic_patient_disease_pd_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.clinic_patient_disease_pd_id_seq OWNED BY ceragen.clinic_patient_disease.pd_id;


--
-- TOC entry 271 (class 1259 OID 21033)
-- Name: clinic_patient_medical_history; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.clinic_patient_medical_history (
    hist_id integer NOT NULL,
    hist_patient_id integer,
    hist_primary_complaint text,
    hist_onset_date date,
    hist_related_trauma boolean,
    hist_current_treatment text,
    hist_notes text,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.clinic_patient_medical_history OWNER TO postgres;

--
-- TOC entry 270 (class 1259 OID 21032)
-- Name: clinic_patient_medical_history_hist_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.clinic_patient_medical_history_hist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.clinic_patient_medical_history_hist_id_seq OWNER TO postgres;

--
-- TOC entry 5400 (class 0 OID 0)
-- Dependencies: 270
-- Name: clinic_patient_medical_history_hist_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.clinic_patient_medical_history_hist_id_seq OWNED BY ceragen.clinic_patient_medical_history.hist_id;


--
-- TOC entry 273 (class 1259 OID 21042)
-- Name: clinic_session_control; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.clinic_session_control (
    sec_id integer NOT NULL,
    sec_inv_id integer,
    sec_pro_id integer,
    sec_ses_number integer,
    sec_ses_agend_date timestamp without time zone,
    sec_ses_exec_date timestamp without time zone,
    sec_typ_id integer,
    sec_med_staff_id integer,
    ses_consumed boolean DEFAULT false,
    ses_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.clinic_session_control OWNER TO postgres;

--
-- TOC entry 272 (class 1259 OID 21041)
-- Name: clinic_session_control_sec_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.clinic_session_control_sec_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.clinic_session_control_sec_id_seq OWNER TO postgres;

--
-- TOC entry 5401 (class 0 OID 0)
-- Dependencies: 272
-- Name: clinic_session_control_sec_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.clinic_session_control_sec_id_seq OWNED BY ceragen.clinic_session_control.sec_id;


--
-- TOC entry 275 (class 1259 OID 21051)
-- Name: segu_login; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.segu_login (
    slo_id integer NOT NULL,
    slo_user_id integer,
    slo_token character varying(1000),
    slo_origin_ip character varying(100),
    slo_host_name character varying(100),
    slo_date_start_connection timestamp without time zone,
    slo_date_end_connection timestamp without time zone
);


ALTER TABLE ceragen.segu_login OWNER TO postgres;

--
-- TOC entry 274 (class 1259 OID 21050)
-- Name: segu_login_slo_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.segu_login_slo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.segu_login_slo_id_seq OWNER TO postgres;

--
-- TOC entry 5402 (class 0 OID 0)
-- Dependencies: 274
-- Name: segu_login_slo_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.segu_login_slo_id_seq OWNED BY ceragen.segu_login.slo_id;


--
-- TOC entry 277 (class 1259 OID 21060)
-- Name: segu_menu; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.segu_menu (
    menu_id integer NOT NULL,
    menu_name character varying(100),
    menu_order integer,
    menu_module_id integer,
    menu_parent_id integer,
    menu_icon_name character varying(100),
    menu_href character varying(100),
    menu_url character varying(100),
    menu_key character varying(100),
    menu_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.segu_menu OWNER TO postgres;

--
-- TOC entry 276 (class 1259 OID 21059)
-- Name: segu_menu_menu_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.segu_menu_menu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.segu_menu_menu_id_seq OWNER TO postgres;

--
-- TOC entry 5403 (class 0 OID 0)
-- Dependencies: 276
-- Name: segu_menu_menu_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.segu_menu_menu_id_seq OWNED BY ceragen.segu_menu.menu_id;


--
-- TOC entry 279 (class 1259 OID 21070)
-- Name: segu_menu_rol; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.segu_menu_rol (
    mr_id integer NOT NULL,
    mr_menu_id integer,
    mr_rol_id integer,
    mr_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.segu_menu_rol OWNER TO postgres;

--
-- TOC entry 278 (class 1259 OID 21069)
-- Name: segu_menu_rol_mr_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.segu_menu_rol_mr_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.segu_menu_rol_mr_id_seq OWNER TO postgres;

--
-- TOC entry 5404 (class 0 OID 0)
-- Dependencies: 278
-- Name: segu_menu_rol_mr_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.segu_menu_rol_mr_id_seq OWNED BY ceragen.segu_menu_rol.mr_id;


--
-- TOC entry 281 (class 1259 OID 21078)
-- Name: segu_module; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.segu_module (
    mod_id integer NOT NULL,
    mod_name character varying(100),
    mod_description character varying(200),
    mod_order integer,
    mod_icon_name character varying(100),
    mod_text_name character varying(100),
    mod_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.segu_module OWNER TO postgres;

--
-- TOC entry 280 (class 1259 OID 21077)
-- Name: segu_module_mod_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.segu_module_mod_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.segu_module_mod_id_seq OWNER TO postgres;

--
-- TOC entry 5405 (class 0 OID 0)
-- Dependencies: 280
-- Name: segu_module_mod_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.segu_module_mod_id_seq OWNED BY ceragen.segu_module.mod_id;


--
-- TOC entry 283 (class 1259 OID 21088)
-- Name: segu_rol; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.segu_rol (
    rol_id integer NOT NULL,
    rol_name character varying(100),
    rol_description character varying(200),
    rol_state boolean DEFAULT true,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone,
    is_admin_rol boolean DEFAULT false
);


ALTER TABLE ceragen.segu_rol OWNER TO postgres;

--
-- TOC entry 282 (class 1259 OID 21087)
-- Name: segu_rol_rol_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.segu_rol_rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.segu_rol_rol_id_seq OWNER TO postgres;

--
-- TOC entry 5406 (class 0 OID 0)
-- Dependencies: 282
-- Name: segu_rol_rol_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.segu_rol_rol_id_seq OWNED BY ceragen.segu_rol.rol_id;


--
-- TOC entry 285 (class 1259 OID 21099)
-- Name: segu_user; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.segu_user (
    user_id integer NOT NULL,
    user_person_id integer,
    user_login_id character varying(100),
    user_mail character varying(100),
    user_password character varying(200),
    user_locked boolean DEFAULT false,
    user_state boolean DEFAULT true,
    user_last_login timestamp without time zone,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone,
    login_attempts integer DEFAULT 0,
    twofa_enabled boolean DEFAULT false
);


ALTER TABLE ceragen.segu_user OWNER TO postgres;

--
-- TOC entry 287 (class 1259 OID 21116)
-- Name: segu_user_notification; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.segu_user_notification (
    sun_id integer NOT NULL,
    sun_user_source_id integer,
    sun_user_destination_id integer,
    sun_title_notification character varying(200),
    sun_text_notification character varying(1000),
    sun_date_notification timestamp without time zone,
    sun_state_notification boolean DEFAULT true,
    sun_isread_notification boolean DEFAULT false,
    sun_date_read_notification timestamp without time zone,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone
);


ALTER TABLE ceragen.segu_user_notification OWNER TO postgres;

--
-- TOC entry 286 (class 1259 OID 21115)
-- Name: segu_user_notification_sun_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.segu_user_notification_sun_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.segu_user_notification_sun_id_seq OWNER TO postgres;

--
-- TOC entry 5407 (class 0 OID 0)
-- Dependencies: 286
-- Name: segu_user_notification_sun_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.segu_user_notification_sun_id_seq OWNED BY ceragen.segu_user_notification.sun_id;


--
-- TOC entry 289 (class 1259 OID 21127)
-- Name: segu_user_rol; Type: TABLE; Schema: ceragen; Owner: postgres
--

CREATE TABLE ceragen.segu_user_rol (
    id_user_rol integer NOT NULL,
    id_user integer,
    id_rol integer,
    user_created character varying(100),
    date_created timestamp without time zone,
    user_modified character varying(100),
    date_modified timestamp without time zone,
    user_deleted character varying(100),
    date_deleted timestamp without time zone,
    state boolean DEFAULT true
);


ALTER TABLE ceragen.segu_user_rol OWNER TO postgres;

--
-- TOC entry 288 (class 1259 OID 21126)
-- Name: segu_user_rol_id_user_rol_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.segu_user_rol_id_user_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.segu_user_rol_id_user_rol_seq OWNER TO postgres;

--
-- TOC entry 5408 (class 0 OID 0)
-- Dependencies: 288
-- Name: segu_user_rol_id_user_rol_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.segu_user_rol_id_user_rol_seq OWNED BY ceragen.segu_user_rol.id_user_rol;


--
-- TOC entry 284 (class 1259 OID 21098)
-- Name: segu_user_user_id_seq; Type: SEQUENCE; Schema: ceragen; Owner: postgres
--

CREATE SEQUENCE ceragen.segu_user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE ceragen.segu_user_user_id_seq OWNER TO postgres;

--
-- TOC entry 5409 (class 0 OID 0)
-- Dependencies: 284
-- Name: segu_user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: ceragen; Owner: postgres
--

ALTER SEQUENCE ceragen.segu_user_user_id_seq OWNED BY ceragen.segu_user.user_id;


--
-- TOC entry 4928 (class 2604 OID 20780)
-- Name: admin_client cli_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_client ALTER COLUMN cli_id SET DEFAULT nextval('ceragen.admin_client_cli_id_seq'::regclass);


--
-- TOC entry 4930 (class 2604 OID 20790)
-- Name: admin_expense exp_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_expense ALTER COLUMN exp_id SET DEFAULT nextval('ceragen.admin_expense_exp_id_seq'::regclass);


--
-- TOC entry 4932 (class 2604 OID 20800)
-- Name: admin_expense_type ext_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_expense_type ALTER COLUMN ext_id SET DEFAULT nextval('ceragen.admin_expense_type_ext_id_seq'::regclass);


--
-- TOC entry 4934 (class 2604 OID 20808)
-- Name: admin_invoice inv_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice ALTER COLUMN inv_id SET DEFAULT nextval('ceragen.admin_invoice_inv_id_seq'::regclass);


--
-- TOC entry 4939 (class 2604 OID 20821)
-- Name: admin_invoice_detail ind_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice_detail ALTER COLUMN ind_id SET DEFAULT nextval('ceragen.admin_invoice_detail_ind_id_seq'::regclass);


--
-- TOC entry 4941 (class 2604 OID 20829)
-- Name: admin_invoice_payment inp_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice_payment ALTER COLUMN inp_id SET DEFAULT nextval('ceragen.admin_invoice_payment_inp_id_seq'::regclass);


--
-- TOC entry 4943 (class 2604 OID 20839)
-- Name: admin_invoice_tax int_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice_tax ALTER COLUMN int_id SET DEFAULT nextval('ceragen.admin_invoice_tax_int_id_seq'::regclass);


--
-- TOC entry 4945 (class 2604 OID 20847)
-- Name: admin_marital_status id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_marital_status ALTER COLUMN id SET DEFAULT nextval('ceragen.admin_marital_status_id_seq'::regclass);


--
-- TOC entry 4947 (class 2604 OID 20855)
-- Name: admin_medic_person_type mpt_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_medic_person_type ALTER COLUMN mpt_id SET DEFAULT nextval('ceragen.admin_medic_person_type_mpt_id_seq'::regclass);


--
-- TOC entry 4949 (class 2604 OID 20863)
-- Name: admin_medical_staff med_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_medical_staff ALTER COLUMN med_id SET DEFAULT nextval('ceragen.admin_medical_staff_med_id_seq'::regclass);


--
-- TOC entry 4951 (class 2604 OID 20871)
-- Name: admin_parameter_list pli_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_parameter_list ALTER COLUMN pli_id SET DEFAULT nextval('ceragen.admin_parameter_list_pli_id_seq'::regclass);


--
-- TOC entry 4954 (class 2604 OID 20882)
-- Name: admin_patient pat_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_patient ALTER COLUMN pat_id SET DEFAULT nextval('ceragen.admin_patient_pat_id_seq'::regclass);


--
-- TOC entry 4956 (class 2604 OID 20894)
-- Name: admin_payment_method pme_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_payment_method ALTER COLUMN pme_id SET DEFAULT nextval('ceragen.admin_payment_method_pme_id_seq'::regclass);


--
-- TOC entry 4960 (class 2604 OID 20904)
-- Name: admin_person per_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_person ALTER COLUMN per_id SET DEFAULT nextval('ceragen.admin_person_per_id_seq'::regclass);


--
-- TOC entry 4962 (class 2604 OID 20916)
-- Name: admin_person_genre id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_person_genre ALTER COLUMN id SET DEFAULT nextval('ceragen.admin_person_genre_id_seq'::regclass);


--
-- TOC entry 4964 (class 2604 OID 20924)
-- Name: admin_product pro_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_product ALTER COLUMN pro_id SET DEFAULT nextval('ceragen.admin_product_pro_id_seq'::regclass);


--
-- TOC entry 4966 (class 2604 OID 20936)
-- Name: admin_product_promotion ppr_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_product_promotion ALTER COLUMN ppr_id SET DEFAULT nextval('ceragen.admin_product_promotion_ppr_id_seq'::regclass);


--
-- TOC entry 4970 (class 2604 OID 20948)
-- Name: admin_tax tax_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_tax ALTER COLUMN tax_id SET DEFAULT nextval('ceragen.admin_tax_tax_id_seq'::regclass);


--
-- TOC entry 4972 (class 2604 OID 20958)
-- Name: admin_therapy_type tht_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_therapy_type ALTER COLUMN tht_id SET DEFAULT nextval('ceragen.admin_therapy_type_tht_id_seq'::regclass);


--
-- TOC entry 4974 (class 2604 OID 20968)
-- Name: audi_sql_events_register ser_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.audi_sql_events_register ALTER COLUMN ser_id SET DEFAULT nextval('ceragen.audi_sql_events_register_ser_id_seq'::regclass);


--
-- TOC entry 4975 (class 2604 OID 20977)
-- Name: audi_tables aut_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.audi_tables ALTER COLUMN aut_id SET DEFAULT nextval('ceragen.audi_tables_aut_id_seq'::regclass);


--
-- TOC entry 4977 (class 2604 OID 20987)
-- Name: clinic_allergy_catalog al_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_allergy_catalog ALTER COLUMN al_id SET DEFAULT nextval('ceragen.clinic_allergy_catalog_al_id_seq'::regclass);


--
-- TOC entry 5010 (class 2604 OID 21137)
-- Name: clinic_blood_type btp_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_blood_type ALTER COLUMN btp_id SET DEFAULT nextval('ceragen.clinic_blood_type_btp_id_seq'::regclass);


--
-- TOC entry 5012 (class 2604 OID 21149)
-- Name: clinic_consent_record con_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_consent_record ALTER COLUMN con_id SET DEFAULT nextval('ceragen.clinic_consent_record_con_id_seq'::regclass);


--
-- TOC entry 4979 (class 2604 OID 20997)
-- Name: clinic_disease_catalog dis_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_disease_catalog ALTER COLUMN dis_id SET DEFAULT nextval('ceragen.clinic_disease_catalog_dis_id_seq'::regclass);


--
-- TOC entry 4981 (class 2604 OID 21007)
-- Name: clinic_disease_type dst_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_disease_type ALTER COLUMN dst_id SET DEFAULT nextval('ceragen.clinic_disease_type_dst_id_seq'::regclass);


--
-- TOC entry 4983 (class 2604 OID 21017)
-- Name: clinic_patient_allergy pa_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_patient_allergy ALTER COLUMN pa_id SET DEFAULT nextval('ceragen.clinic_patient_allergy_pa_id_seq'::regclass);


--
-- TOC entry 4984 (class 2604 OID 21026)
-- Name: clinic_patient_disease pd_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_patient_disease ALTER COLUMN pd_id SET DEFAULT nextval('ceragen.clinic_patient_disease_pd_id_seq'::regclass);


--
-- TOC entry 4986 (class 2604 OID 21036)
-- Name: clinic_patient_medical_history hist_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_patient_medical_history ALTER COLUMN hist_id SET DEFAULT nextval('ceragen.clinic_patient_medical_history_hist_id_seq'::regclass);


--
-- TOC entry 4987 (class 2604 OID 21045)
-- Name: clinic_session_control sec_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_session_control ALTER COLUMN sec_id SET DEFAULT nextval('ceragen.clinic_session_control_sec_id_seq'::regclass);


--
-- TOC entry 4990 (class 2604 OID 21054)
-- Name: segu_login slo_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_login ALTER COLUMN slo_id SET DEFAULT nextval('ceragen.segu_login_slo_id_seq'::regclass);


--
-- TOC entry 4991 (class 2604 OID 21063)
-- Name: segu_menu menu_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_menu ALTER COLUMN menu_id SET DEFAULT nextval('ceragen.segu_menu_menu_id_seq'::regclass);


--
-- TOC entry 4993 (class 2604 OID 21073)
-- Name: segu_menu_rol mr_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_menu_rol ALTER COLUMN mr_id SET DEFAULT nextval('ceragen.segu_menu_rol_mr_id_seq'::regclass);


--
-- TOC entry 4995 (class 2604 OID 21081)
-- Name: segu_module mod_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_module ALTER COLUMN mod_id SET DEFAULT nextval('ceragen.segu_module_mod_id_seq'::regclass);


--
-- TOC entry 4997 (class 2604 OID 21091)
-- Name: segu_rol rol_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_rol ALTER COLUMN rol_id SET DEFAULT nextval('ceragen.segu_rol_rol_id_seq'::regclass);


--
-- TOC entry 5000 (class 2604 OID 21102)
-- Name: segu_user user_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_user ALTER COLUMN user_id SET DEFAULT nextval('ceragen.segu_user_user_id_seq'::regclass);


--
-- TOC entry 5005 (class 2604 OID 21119)
-- Name: segu_user_notification sun_id; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_user_notification ALTER COLUMN sun_id SET DEFAULT nextval('ceragen.segu_user_notification_sun_id_seq'::regclass);


--
-- TOC entry 5008 (class 2604 OID 21130)
-- Name: segu_user_rol id_user_rol; Type: DEFAULT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_user_rol ALTER COLUMN id_user_rol SET DEFAULT nextval('ceragen.segu_user_rol_id_user_rol_seq'::regclass);


--
-- TOC entry 5292 (class 0 OID 20777)
-- Dependencies: 219
-- Data for Name: admin_client; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--

INSERT INTO ceragen.admin_client VALUES (1, 18, NULL, NULL, NULL, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_client VALUES (2, 25, NULL, NULL, NULL, NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 5294 (class 0 OID 20787)
-- Dependencies: 221
-- Data for Name: admin_expense; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5296 (class 0 OID 20797)
-- Dependencies: 223
-- Data for Name: admin_expense_type; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5298 (class 0 OID 20805)
-- Dependencies: 225
-- Data for Name: admin_invoice; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5300 (class 0 OID 20818)
-- Dependencies: 227
-- Data for Name: admin_invoice_detail; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5302 (class 0 OID 20826)
-- Dependencies: 229
-- Data for Name: admin_invoice_payment; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5304 (class 0 OID 20836)
-- Dependencies: 231
-- Data for Name: admin_invoice_tax; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5306 (class 0 OID 20844)
-- Dependencies: 233
-- Data for Name: admin_marital_status; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--

INSERT INTO ceragen.admin_marital_status VALUES (1, 'SOLTERO-A', true, 'admin', '2024-05-10 00:00:00', NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_marital_status VALUES (2, 'CASADO-A', true, 'admin', '2024-05-10 00:00:00', NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_marital_status VALUES (3, 'DIVORCIADO-A', true, 'admin', '2024-05-10 00:00:00', NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_marital_status VALUES (4, 'VIUDO-A', true, 'admin', '2024-05-10 00:00:00', 'Admin', '2024-08-06 12:38:41.515883', NULL, NULL);
INSERT INTO ceragen.admin_marital_status VALUES (5, 'UNION LIBRE', true, 'admin', '2024-06-14 10:26:05.805798', 'Admin', '2024-08-06 12:37:38.429654', NULL, NULL);
INSERT INTO ceragen.admin_marital_status VALUES (8, 'CASADO', false, 'Admin', '2024-08-06 12:38:08.1407', NULL, NULL, NULL, NULL);


--
-- TOC entry 5308 (class 0 OID 20852)
-- Dependencies: 235
-- Data for Name: admin_medic_person_type; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--

INSERT INTO ceragen.admin_medic_person_type VALUES (1, 'Fisioterapeuta', 'Este medico es un fisioterapeuta', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_medic_person_type VALUES (2, 'Enfermero', 'Este medico es un enfermero', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_medic_person_type VALUES (3, 'Terapeuta', 'Este medico es un terapeuta', true, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 5310 (class 0 OID 20860)
-- Dependencies: 237
-- Data for Name: admin_medical_staff; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--

INSERT INTO ceragen.admin_medical_staff VALUES (2, 22, 1, NULL, 'Fisiatria', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_medical_staff VALUES (1, 19, 3, NULL, 'Pediatrica', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_medical_staff VALUES (3, 24, 3, NULL, 'Fisiatria', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_medical_staff VALUES (4, 39, 2, NULL, 'Enfermeria', false, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 5312 (class 0 OID 20868)
-- Dependencies: 239
-- Data for Name: admin_parameter_list; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5314 (class 0 OID 20879)
-- Dependencies: 241
-- Data for Name: admin_patient; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--

INSERT INTO ceragen.admin_patient VALUES (4, 29, NULL, NULL, 'Artrosis , Lupus ', 'Picaduras de insectos , penicilina ', 1, 'Luisa ', '0987654321', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_patient VALUES (1, 20, NULL, NULL, 'Silla de rueda ', 'Penicilina', 3, 'Jaime Perez ', '0987654321', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_patient VALUES (3, 28, NULL, NULL, 'Diabetes', 'Omeprazol', 7, 'Luisa Molina', '0987654321', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_patient VALUES (2, 23, NULL, NULL, 'Diabetes', 'Omeprazol', 2, 'Jaime Molina', '0987654321', false, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 5316 (class 0 OID 20891)
-- Dependencies: 243
-- Data for Name: admin_payment_method; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5318 (class 0 OID 20901)
-- Dependencies: 245
-- Data for Name: admin_person; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--

INSERT INTO ceragen.admin_person VALUES (4, '0955008594', 'EDDER LIVINGTON', 'MONTOYA VARGAS', 1, 1, 'ECUADOR', 'GUAYAQUIL', 'FLOR DE BASTION', '0979364604', 'edder.montoyav@ug.edu.ec', '2024-09-03 03:14:35.022096', true, 'admin', '2024-09-03 03:00:10.106725', 'Admin', '2024-09-03 03:14:35.022097', NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (5, '0930168869', 'RAFAEL HUMBERTO', 'MIRANDA ALMENDARIS', 1, 1, 'ECUADOR', 'GUAYAQUIL', 'S/N', '0989608425', 'rafael.mirandaa@ug.edu.ec', '2024-09-03 03:14:35.022096', true, 'Admin', '2024-09-03 03:00:10.106725', NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (6, '0706552775', 'MIGUEL FAUSTO', 'VALAREZO SANCHEZ', 1, 1, 'ECUADOR', 'GUAYAQUIL', 'S/N', '0994273187', 'miguel.valarezo@ug.edu.ec', '2024-09-03 03:14:35.022096', true, 'Admin', '2024-09-03 03:00:10.106725', NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (7, '1206478735', 'ELSY', 'RODRIGUEZ REVELO', 2, 1, 'ECUADOR', 'GUAYAQUIL', 'S/N', '0960849118', 'elsy.rodriguez@ug.edu.ec', '2024-09-03 03:14:35.022096', true, 'Admin', '2024-09-03 03:00:10.106725', NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (8, '0955507397', 'JOSE', 'MEJIA CORREA', 1, 1, 'ECUADOR', 'GUAYAQUIL', 'S/N', '0980263990', 'jose.mejiac@ug.edu.ec', NULL, true, 'Admin', '2024-09-06 02:41:10.686971', NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (10, '0953447224', 'JEAN CARLOS ', 'AQUINO VELOZ', 1, 1, 'ECUADOR', 'GUAYAQUIL', '26 Y LA E', '0968621276', 'jeancarlaquino@gmail.com', '2024-09-12 01:39:20.299539', true, 'Admin', '2024-09-12 01:39:20.299542', NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (11, '0956123822', 'SAMANTHA ', 'MENDOZA', 2, 2, 'ECUADOR', 'SANTA LUCIA', 'AV 3 DE FEBRERO', '0945782587', 'samantamend1@outlook.com', '2024-09-12 20:43:22.616451', true, 'Admin', '2024-09-12 20:42:21.944096', 'Admin', '2024-09-12 20:43:22.616451', NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (1, '0910203040', 'ADMINISTRADOR', 'SISTEMA', 1, 1, 'ECUADOR', 'GUAYAQUIL', 'S/N', '0987654321', 'secoed.web@gmail.com', '2000-01-01 00:00:00', true, 'Admin', '2025-05-02 00:00:00', NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (2, '0985245721', 'ADMINISTRADOR', 'TICS', 1, 1, 'ECUADOR', 'GUAYAQUIL', 'S/N', '0931648901', 'secoed.web@gmail.com', '2024-06-14 23:04:11.296734', false, 'Admin', '2024-06-14 17:28:19.649418', 'Admin', '2024-06-14 23:04:11.296734', 'Admin', '2024-06-16 18:20:37.417047');
INSERT INTO ceragen.admin_person VALUES (3, '0931648901', 'JOSEPH JOSÉ', 'CASTRO REYES', 1, 5, 'ECUADOR', 'DAULE', 'GENERAL VERNAZA Y SUCRE', '0985245721', 'joseph.castror@ug.edu.ec', '2024-09-09 22:22:28.864612', true, 'ADMIN', '2024-06-25 21:50:22.979127', 'Admin', '2024-09-09 22:22:28.864613', NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (12, '0915298079', 'ANGELA', 'YANZA', 2, 1, 'ECUADOR', 'GUAYAQUIL', 'NORTE', '0983035702', 'angelayanza@gmail.com', '2024-09-15 21:58:21.517746', true, 'Admin', '2024-09-15 21:57:56.70112', 'Admin', '2024-09-15 21:58:21.517747', NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (14, '0925164113', 'Jeshua Daniel', 'Naranjo Espinoza', 1, 1, 'Ecuador', 'Duran', 'Primavera 2', '0990909992', 'jeshua@gmail.com', '2025-06-24 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (15, '0925164111', 'Pablo Eduardo', 'Cruz Guala', 1, 1, 'Ecuador', 'Duran', 'Colinas del valle', '0990909901', 'pabloc@gmail.com', '2000-01-01 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (16, '0925164101', 'Angelica Samantaaa', 'Mendoza Medina', 2, 1, 'Ecuador', 'Guayaquil', 'Cerro mapasingue', '0990909902', 'angelicam@gmail.com', '2000-01-01 00:00:00', false, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (19, '0925164103', 'Juan', 'Leon', 1, 1, 'Ecuador', 'Guayaquil', 'Ciudadela 9 de octubre', '0990909902', 'juanl@gmail.com', '1980-01-01 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (20, '0925164104', 'Roberto', 'Gomez', 1, 1, 'Ecuador', 'Guayaquil', 'Ciudadela 9 de octubre', '0990909902', 'robertog@gmail.com', '1980-01-01 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (21, '1208148682', 'Melek', 'Moran', 2, 1, 'Ecuador', 'Manta', 'Lomas', '0998020380', 'mariagomez@gmail.com', '2003-07-14 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (22, '1250626841', 'Cesar', 'Mendoza', 1, 1, 'Ecuador', 'Vinces ', 'Lomas de Sargentillo', '0987654321', 'cesar@gmail.com', '2000-04-11 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (38, '1267007000', 'Mercedes', 'Montalvan', 2, 2, 'Ecuador', 'Guayaquil', 'Centro', '0978654321', 'Mercedes@gmail.com', '2005-03-20 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (23, '1204009000', 'Merida', 'Molina', 2, 2, 'Ecuador', 'Vinces ', 'Lomas', '0909090909', 'melina@gmail.com', '2025-05-28 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (24, '1203004000', 'Juan Antonio', 'Mendoza Vera', 1, 2, 'Ecuador', 'Vinces', 'Centro', '0980808090', 'antonio@gmail.com', '1980-01-31 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (25, '1256007000', 'Wilson Antonio', 'Mendoza Medina', 1, 2, 'Ecuador', 'Vinces', 'Centro Sur ', '0980808090', 'Wilson@gmail.com', '2006-08-13 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (39, '1208148681', 'Jorge', 'Mendoza', 1, 4, 'Ecuador', 'Vinces', 'Lomas', '0987654321', 'jorgemendoza@gmail.com', '2000-07-06 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (18, '0925164102', 'Vicente', 'Fernandez', 1, 3, 'Ecuador', 'Guayaquil', 'Ciudadela 9 de octubre', '0990909902', 'vicentef@gmail.com', '1980-01-01 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (26, '1209008000', 'Luisa ', 'MENDOZA MEDINA', 2, 1, 'Ecuador', 'Guayaquil', 'Centro Sur ', '0987654321', 'luisa@gmail.com', '2001-07-20 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (27, '1252002000', 'Luisa ', 'MENDOZA', 2, 1, 'Ecuador', 'Guayaquil', 'Centro Sur ', '0980808090', 'luisa@gmail.com', '2003-06-13 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (28, '1202002000', 'Cesar', 'Mendoza', 1, 1, 'Ecuador', 'Vinces ', 'Urdesa', '0987654321', 'cesar@gmail.com', '2004-03-20 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person VALUES (29, '1201001000', 'Luisa', 'Rivadeneira', 2, 1, 'Ecuador', 'Manta', 'Tanque', '0987654321', 'Luisarivadeniera@gmail.com', '2000-02-20 00:00:00', true, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 5320 (class 0 OID 20913)
-- Dependencies: 247
-- Data for Name: admin_person_genre; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--

INSERT INTO ceragen.admin_person_genre VALUES (1, 'MASCULINO', true, 'ADMIN', '2024-05-11 00:00:00', NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person_genre VALUES (2, 'FEMENINO', true, 'ADMIN', '2024-05-11 00:00:00', NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_person_genre VALUES (3, 'OTROS', true, 'ADMIN', '2024-06-15 09:41:31.394505', 'ADMIN', '2024-06-15 10:15:08.656477', NULL, NULL);


--
-- TOC entry 5322 (class 0 OID 20921)
-- Dependencies: 249
-- Data for Name: admin_product; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--

INSERT INTO ceragen.admin_product VALUES (1, NULL, 'Apiterapia', 'Esta terapia natural consiste en emplear productos elaborados por las abejas, sobre todo la apitoxina que es el veneno que trasmiten por su aguijón', 29.99, 3, NULL, NULL, 1, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_product VALUES (2, NULL, 'Aromaterapia', 'medicina alternativa basada en el uso de materiales aromáticos, incluidos los aceites esenciales y otros compuestos aromáticos', 19.99, 2, NULL, NULL, 1, true, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 5324 (class 0 OID 20933)
-- Dependencies: 251
-- Data for Name: admin_product_promotion; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5326 (class 0 OID 20945)
-- Dependencies: 253
-- Data for Name: admin_tax; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5328 (class 0 OID 20955)
-- Dependencies: 255
-- Data for Name: admin_therapy_type; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--

INSERT INTO ceragen.admin_therapy_type VALUES (1, 'Terapia Alternativa', 'Medicinal sin necesidad de valoracion medica', true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.admin_therapy_type VALUES (2, 'Terapia Fisica', 'Es necesaria una valoracion medica interna o externa', true, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 5330 (class 0 OID 20965)
-- Dependencies: 257
-- Data for Name: audi_sql_events_register; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5332 (class 0 OID 20974)
-- Dependencies: 259
-- Data for Name: audi_tables; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5334 (class 0 OID 20984)
-- Dependencies: 261
-- Data for Name: clinic_allergy_catalog; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5364 (class 0 OID 21134)
-- Dependencies: 291
-- Data for Name: clinic_blood_type; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--

INSERT INTO ceragen.clinic_blood_type VALUES (1, 'A+', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_blood_type VALUES (2, 'A-', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_blood_type VALUES (3, 'B+', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_blood_type VALUES (4, 'B-', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_blood_type VALUES (5, 'AB+', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_blood_type VALUES (6, 'AB-', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_blood_type VALUES (7, 'O+', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_blood_type VALUES (8, 'O-', NULL, true, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 5366 (class 0 OID 21146)
-- Dependencies: 293
-- Data for Name: clinic_consent_record; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5336 (class 0 OID 20994)
-- Dependencies: 263
-- Data for Name: clinic_disease_catalog; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5338 (class 0 OID 21004)
-- Dependencies: 265
-- Data for Name: clinic_disease_type; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5340 (class 0 OID 21014)
-- Dependencies: 267
-- Data for Name: clinic_patient_allergy; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5342 (class 0 OID 21023)
-- Dependencies: 269
-- Data for Name: clinic_patient_disease; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5344 (class 0 OID 21033)
-- Dependencies: 271
-- Data for Name: clinic_patient_medical_history; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--

INSERT INTO ceragen.clinic_patient_medical_history VALUES (1, 1, 'Lorem Ipsum Register', NULL, true, 'Lorem Ipsum Treatment', 'Lorem Ipsum notes', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (6, 4, 'Prueba 3', NULL, false, 'Prueba 3', 'Prueba 3', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (7, 4, 'Prueba 4', NULL, false, 'Prueba 4', 'La prueba', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (8, 3, 'Prueba 1 ', NULL, true, 'Prueba 1', 'prueba 1 ', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (9, 3, 'Nueva hisotria ', NULL, false, 'nueva', 'nueva', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (12, 2, 'Prueba', NULL, false, 'prueba', 'prueba', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (13, 2, 'prueba tercera', NULL, false, 'prueba tercera', 'prueba tercera', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (14, 2, 'prueba tercera', NULL, false, 'prueba tercera', 'prueba tercera', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (15, 2, 'prueba cuarta', NULL, true, 'prueba cuarta', 'prueba cuarta', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (16, 1, 'prueba segunda ', NULL, false, 'prueba segunda ', 'prueba segunda ', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (3, 4, 'Artrosis y artritis ', NULL, false, 'Ejercicios', 'Prueba', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (2, 4, 'Viendo si cambia en la edicion ', NULL, true, 'prueba segunda ', 'prueba', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (4, 4, 'Lupus viendo analizando si edita ', NULL, true, 'Sueros ', 'Revision de examenes ', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (17, 4, 'probando registro', NULL, true, 'Probando registro', 'Probando ', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (5, 4, 'Prueba 2 editando ', NULL, true, 'Prueba', 'Prueba', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (11, 1, 'Artrosis , artirirts reumatismo ', NULL, false, 'Ejercicios', 'edicion', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (10, 3, 'editando prueba tercera', NULL, true, 'Examenes', 'Revision de examenes ', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO ceragen.clinic_patient_medical_history VALUES (18, 3, 'Artrosis , artirirts reumatismo ', NULL, true, 'Meditacion ', 'Prueba ', NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 5346 (class 0 OID 21042)
-- Dependencies: 273
-- Data for Name: clinic_session_control; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5348 (class 0 OID 21051)
-- Dependencies: 275
-- Data for Name: segu_login; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5350 (class 0 OID 21060)
-- Dependencies: 277
-- Data for Name: segu_menu; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5352 (class 0 OID 21070)
-- Dependencies: 279
-- Data for Name: segu_menu_rol; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5354 (class 0 OID 21078)
-- Dependencies: 281
-- Data for Name: segu_module; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5356 (class 0 OID 21088)
-- Dependencies: 283
-- Data for Name: segu_rol; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--

INSERT INTO ceragen.segu_rol VALUES (1, 'Admin', 'Es quien administra todo el sistema, solo existira ese', true, NULL, NULL, NULL, NULL, NULL, NULL, true);
INSERT INTO ceragen.segu_rol VALUES (2, 'Secretario/a', 'Es quien hace otras operaciones', true, NULL, NULL, NULL, NULL, NULL, NULL, false);
INSERT INTO ceragen.segu_rol VALUES (3, 'Medico', 'Es quien hace otras operaciones', true, NULL, NULL, NULL, NULL, NULL, NULL, false);
INSERT INTO ceragen.segu_rol VALUES (4, 'Cliente', 'Es quien hace otras operaciones', true, NULL, NULL, NULL, NULL, NULL, NULL, false);
INSERT INTO ceragen.segu_rol VALUES (5, 'Paciente', 'Es quien hace otras operaciones', true, NULL, NULL, NULL, NULL, NULL, NULL, false);


--
-- TOC entry 5358 (class 0 OID 21099)
-- Dependencies: 285
-- Data for Name: segu_user; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--

INSERT INTO ceragen.segu_user VALUES (1, 16, NULL, 'angelicam@gmail.com', '0925164101', false, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, false);
INSERT INTO ceragen.segu_user VALUES (2, 15, NULL, 'pabloc@gmail.com', '0925164111', false, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, false);
INSERT INTO ceragen.segu_user VALUES (3, 18, NULL, 'vicentef@gmail.com', '0925164102', false, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, false);
INSERT INTO ceragen.segu_user VALUES (4, 19, NULL, 'juanl@gmail.com', '0925164103', false, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, false);
INSERT INTO ceragen.segu_user VALUES (5, 20, NULL, 'robertog@gmail.com', '0925164104', false, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, false);
INSERT INTO ceragen.segu_user VALUES (10, 21, NULL, 'mariagomez@gmail.com', '1208148682', false, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, false);
INSERT INTO ceragen.segu_user VALUES (11, 22, NULL, 'cesar@gmail.com', '1250626841', false, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, false);
INSERT INTO ceragen.segu_user VALUES (12, 23, NULL, 'melina@gmail.com', '1204009000', false, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, false);
INSERT INTO ceragen.segu_user VALUES (13, 24, NULL, 'antonio@gmail.com', '1203004000', false, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, false);
INSERT INTO ceragen.segu_user VALUES (14, 25, NULL, 'Wilson@gmail.com', '1256007000', false, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, false);
INSERT INTO ceragen.segu_user VALUES (15, 26, NULL, 'luisa@gmail.com', '1209008000', false, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, false);
INSERT INTO ceragen.segu_user VALUES (18, 29, NULL, 'Luisarivadeniera@gmail.com', '1201001000', false, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, false);
INSERT INTO ceragen.segu_user VALUES (20, 38, NULL, 'Mercedes@gmail.com', '1267007000', false, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, false);
INSERT INTO ceragen.segu_user VALUES (21, 39, NULL, 'jorgemendoza@gmail.com', '1208148681', false, true, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, false);


--
-- TOC entry 5360 (class 0 OID 21116)
-- Dependencies: 287
-- Data for Name: segu_user_notification; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--



--
-- TOC entry 5362 (class 0 OID 21127)
-- Dependencies: 289
-- Data for Name: segu_user_rol; Type: TABLE DATA; Schema: ceragen; Owner: postgres
--

INSERT INTO ceragen.segu_user_rol VALUES (2, 2, 2, NULL, NULL, NULL, NULL, NULL, NULL, false);
INSERT INTO ceragen.segu_user_rol VALUES (6, 3, 4, NULL, NULL, NULL, NULL, NULL, NULL, true);
INSERT INTO ceragen.segu_user_rol VALUES (7, 4, 3, NULL, NULL, NULL, NULL, NULL, NULL, true);
INSERT INTO ceragen.segu_user_rol VALUES (8, 5, 5, NULL, NULL, NULL, NULL, NULL, NULL, true);
INSERT INTO ceragen.segu_user_rol VALUES (11, 10, 1, NULL, NULL, NULL, NULL, NULL, NULL, true);
INSERT INTO ceragen.segu_user_rol VALUES (12, 11, 3, NULL, NULL, NULL, NULL, NULL, NULL, true);
INSERT INTO ceragen.segu_user_rol VALUES (13, 12, 5, NULL, NULL, NULL, NULL, NULL, NULL, false);
INSERT INTO ceragen.segu_user_rol VALUES (14, 13, 3, NULL, NULL, NULL, NULL, NULL, NULL, false);
INSERT INTO ceragen.segu_user_rol VALUES (15, 14, 4, NULL, NULL, NULL, NULL, NULL, NULL, false);
INSERT INTO ceragen.segu_user_rol VALUES (1, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, false);
INSERT INTO ceragen.segu_user_rol VALUES (16, 15, 1, NULL, NULL, NULL, NULL, NULL, NULL, false);
INSERT INTO ceragen.segu_user_rol VALUES (17, 18, 5, NULL, NULL, NULL, NULL, NULL, NULL, true);
INSERT INTO ceragen.segu_user_rol VALUES (18, 20, 2, NULL, NULL, NULL, NULL, NULL, NULL, false);
INSERT INTO ceragen.segu_user_rol VALUES (19, 21, 3, NULL, NULL, NULL, NULL, NULL, NULL, true);


--
-- TOC entry 5410 (class 0 OID 0)
-- Dependencies: 218
-- Name: admin_client_cli_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_client_cli_id_seq', 2, true);


--
-- TOC entry 5411 (class 0 OID 0)
-- Dependencies: 220
-- Name: admin_expense_exp_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_expense_exp_id_seq', 1, false);


--
-- TOC entry 5412 (class 0 OID 0)
-- Dependencies: 222
-- Name: admin_expense_type_ext_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_expense_type_ext_id_seq', 1, false);


--
-- TOC entry 5413 (class 0 OID 0)
-- Dependencies: 226
-- Name: admin_invoice_detail_ind_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_invoice_detail_ind_id_seq', 1, false);


--
-- TOC entry 5414 (class 0 OID 0)
-- Dependencies: 224
-- Name: admin_invoice_inv_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_invoice_inv_id_seq', 1, false);


--
-- TOC entry 5415 (class 0 OID 0)
-- Dependencies: 228
-- Name: admin_invoice_payment_inp_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_invoice_payment_inp_id_seq', 1, false);


--
-- TOC entry 5416 (class 0 OID 0)
-- Dependencies: 230
-- Name: admin_invoice_tax_int_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_invoice_tax_int_id_seq', 1, false);


--
-- TOC entry 5417 (class 0 OID 0)
-- Dependencies: 232
-- Name: admin_marital_status_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_marital_status_id_seq', 1, false);


--
-- TOC entry 5418 (class 0 OID 0)
-- Dependencies: 234
-- Name: admin_medic_person_type_mpt_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_medic_person_type_mpt_id_seq', 3, true);


--
-- TOC entry 5419 (class 0 OID 0)
-- Dependencies: 236
-- Name: admin_medical_staff_med_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_medical_staff_med_id_seq', 4, true);


--
-- TOC entry 5420 (class 0 OID 0)
-- Dependencies: 238
-- Name: admin_parameter_list_pli_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_parameter_list_pli_id_seq', 1, false);


--
-- TOC entry 5421 (class 0 OID 0)
-- Dependencies: 240
-- Name: admin_patient_pat_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_patient_pat_id_seq', 4, true);


--
-- TOC entry 5422 (class 0 OID 0)
-- Dependencies: 242
-- Name: admin_payment_method_pme_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_payment_method_pme_id_seq', 1, false);


--
-- TOC entry 5423 (class 0 OID 0)
-- Dependencies: 246
-- Name: admin_person_genre_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_person_genre_id_seq', 1, false);


--
-- TOC entry 5424 (class 0 OID 0)
-- Dependencies: 244
-- Name: admin_person_per_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_person_per_id_seq', 39, true);


--
-- TOC entry 5425 (class 0 OID 0)
-- Dependencies: 248
-- Name: admin_product_pro_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_product_pro_id_seq', 2, true);


--
-- TOC entry 5426 (class 0 OID 0)
-- Dependencies: 250
-- Name: admin_product_promotion_ppr_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_product_promotion_ppr_id_seq', 1, false);


--
-- TOC entry 5427 (class 0 OID 0)
-- Dependencies: 252
-- Name: admin_tax_tax_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_tax_tax_id_seq', 1, false);


--
-- TOC entry 5428 (class 0 OID 0)
-- Dependencies: 254
-- Name: admin_therapy_type_tht_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.admin_therapy_type_tht_id_seq', 2, true);


--
-- TOC entry 5429 (class 0 OID 0)
-- Dependencies: 256
-- Name: audi_sql_events_register_ser_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.audi_sql_events_register_ser_id_seq', 1, false);


--
-- TOC entry 5430 (class 0 OID 0)
-- Dependencies: 258
-- Name: audi_tables_aut_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.audi_tables_aut_id_seq', 1, false);


--
-- TOC entry 5431 (class 0 OID 0)
-- Dependencies: 260
-- Name: clinic_allergy_catalog_al_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.clinic_allergy_catalog_al_id_seq', 1, false);


--
-- TOC entry 5432 (class 0 OID 0)
-- Dependencies: 290
-- Name: clinic_blood_type_btp_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.clinic_blood_type_btp_id_seq', 8, true);


--
-- TOC entry 5433 (class 0 OID 0)
-- Dependencies: 292
-- Name: clinic_consent_record_con_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.clinic_consent_record_con_id_seq', 1, false);


--
-- TOC entry 5434 (class 0 OID 0)
-- Dependencies: 262
-- Name: clinic_disease_catalog_dis_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.clinic_disease_catalog_dis_id_seq', 1, false);


--
-- TOC entry 5435 (class 0 OID 0)
-- Dependencies: 264
-- Name: clinic_disease_type_dst_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.clinic_disease_type_dst_id_seq', 1, false);


--
-- TOC entry 5436 (class 0 OID 0)
-- Dependencies: 266
-- Name: clinic_patient_allergy_pa_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.clinic_patient_allergy_pa_id_seq', 1, false);


--
-- TOC entry 5437 (class 0 OID 0)
-- Dependencies: 268
-- Name: clinic_patient_disease_pd_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.clinic_patient_disease_pd_id_seq', 1, false);


--
-- TOC entry 5438 (class 0 OID 0)
-- Dependencies: 270
-- Name: clinic_patient_medical_history_hist_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.clinic_patient_medical_history_hist_id_seq', 18, true);


--
-- TOC entry 5439 (class 0 OID 0)
-- Dependencies: 272
-- Name: clinic_session_control_sec_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.clinic_session_control_sec_id_seq', 1, false);


--
-- TOC entry 5440 (class 0 OID 0)
-- Dependencies: 274
-- Name: segu_login_slo_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.segu_login_slo_id_seq', 1, false);


--
-- TOC entry 5441 (class 0 OID 0)
-- Dependencies: 276
-- Name: segu_menu_menu_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.segu_menu_menu_id_seq', 1, false);


--
-- TOC entry 5442 (class 0 OID 0)
-- Dependencies: 278
-- Name: segu_menu_rol_mr_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.segu_menu_rol_mr_id_seq', 1, false);


--
-- TOC entry 5443 (class 0 OID 0)
-- Dependencies: 280
-- Name: segu_module_mod_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.segu_module_mod_id_seq', 1, false);


--
-- TOC entry 5444 (class 0 OID 0)
-- Dependencies: 282
-- Name: segu_rol_rol_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.segu_rol_rol_id_seq', 5, true);


--
-- TOC entry 5445 (class 0 OID 0)
-- Dependencies: 286
-- Name: segu_user_notification_sun_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.segu_user_notification_sun_id_seq', 1, false);


--
-- TOC entry 5446 (class 0 OID 0)
-- Dependencies: 288
-- Name: segu_user_rol_id_user_rol_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.segu_user_rol_id_user_rol_seq', 19, true);


--
-- TOC entry 5447 (class 0 OID 0)
-- Dependencies: 284
-- Name: segu_user_user_id_seq; Type: SEQUENCE SET; Schema: ceragen; Owner: postgres
--

SELECT pg_catalog.setval('ceragen.segu_user_user_id_seq', 21, true);


--
-- TOC entry 5014 (class 2606 OID 20785)
-- Name: admin_client admin_client_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_client
    ADD CONSTRAINT admin_client_pkey PRIMARY KEY (cli_id);


--
-- TOC entry 5016 (class 2606 OID 20795)
-- Name: admin_expense admin_expense_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_expense
    ADD CONSTRAINT admin_expense_pkey PRIMARY KEY (exp_id);


--
-- TOC entry 5018 (class 2606 OID 20803)
-- Name: admin_expense_type admin_expense_type_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_expense_type
    ADD CONSTRAINT admin_expense_type_pkey PRIMARY KEY (ext_id);


--
-- TOC entry 5024 (class 2606 OID 20824)
-- Name: admin_invoice_detail admin_invoice_detail_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice_detail
    ADD CONSTRAINT admin_invoice_detail_pkey PRIMARY KEY (ind_id);


--
-- TOC entry 5020 (class 2606 OID 20816)
-- Name: admin_invoice admin_invoice_inv_number_key; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice
    ADD CONSTRAINT admin_invoice_inv_number_key UNIQUE (inv_number);


--
-- TOC entry 5026 (class 2606 OID 20834)
-- Name: admin_invoice_payment admin_invoice_payment_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice_payment
    ADD CONSTRAINT admin_invoice_payment_pkey PRIMARY KEY (inp_id);


--
-- TOC entry 5022 (class 2606 OID 20814)
-- Name: admin_invoice admin_invoice_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice
    ADD CONSTRAINT admin_invoice_pkey PRIMARY KEY (inv_id);


--
-- TOC entry 5028 (class 2606 OID 20842)
-- Name: admin_invoice_tax admin_invoice_tax_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice_tax
    ADD CONSTRAINT admin_invoice_tax_pkey PRIMARY KEY (int_id);


--
-- TOC entry 5030 (class 2606 OID 20850)
-- Name: admin_marital_status admin_marital_status_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_marital_status
    ADD CONSTRAINT admin_marital_status_pkey PRIMARY KEY (id);


--
-- TOC entry 5032 (class 2606 OID 20858)
-- Name: admin_medic_person_type admin_medic_person_type_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_medic_person_type
    ADD CONSTRAINT admin_medic_person_type_pkey PRIMARY KEY (mpt_id);


--
-- TOC entry 5034 (class 2606 OID 20866)
-- Name: admin_medical_staff admin_medical_staff_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_medical_staff
    ADD CONSTRAINT admin_medical_staff_pkey PRIMARY KEY (med_id);


--
-- TOC entry 5036 (class 2606 OID 20877)
-- Name: admin_parameter_list admin_parameter_list_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_parameter_list
    ADD CONSTRAINT admin_parameter_list_pkey PRIMARY KEY (pli_id);


--
-- TOC entry 5038 (class 2606 OID 20889)
-- Name: admin_patient admin_patient_pat_code_key; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_patient
    ADD CONSTRAINT admin_patient_pat_code_key UNIQUE (pat_code);


--
-- TOC entry 5040 (class 2606 OID 20887)
-- Name: admin_patient admin_patient_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_patient
    ADD CONSTRAINT admin_patient_pkey PRIMARY KEY (pat_id);


--
-- TOC entry 5042 (class 2606 OID 20899)
-- Name: admin_payment_method admin_payment_method_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_payment_method
    ADD CONSTRAINT admin_payment_method_pkey PRIMARY KEY (pme_id);


--
-- TOC entry 5048 (class 2606 OID 20919)
-- Name: admin_person_genre admin_person_genre_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_person_genre
    ADD CONSTRAINT admin_person_genre_pkey PRIMARY KEY (id);


--
-- TOC entry 5044 (class 2606 OID 20911)
-- Name: admin_person admin_person_per_identification_key; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_person
    ADD CONSTRAINT admin_person_per_identification_key UNIQUE (per_identification);


--
-- TOC entry 5046 (class 2606 OID 20909)
-- Name: admin_person admin_person_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_person
    ADD CONSTRAINT admin_person_pkey PRIMARY KEY (per_id);


--
-- TOC entry 5050 (class 2606 OID 20929)
-- Name: admin_product admin_product_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_product
    ADD CONSTRAINT admin_product_pkey PRIMARY KEY (pro_id);


--
-- TOC entry 5052 (class 2606 OID 20931)
-- Name: admin_product admin_product_pro_code_key; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_product
    ADD CONSTRAINT admin_product_pro_code_key UNIQUE (pro_code);


--
-- TOC entry 5054 (class 2606 OID 20943)
-- Name: admin_product_promotion admin_product_promotion_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_product_promotion
    ADD CONSTRAINT admin_product_promotion_pkey PRIMARY KEY (ppr_id);


--
-- TOC entry 5056 (class 2606 OID 20953)
-- Name: admin_tax admin_tax_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_tax
    ADD CONSTRAINT admin_tax_pkey PRIMARY KEY (tax_id);


--
-- TOC entry 5058 (class 2606 OID 20963)
-- Name: admin_therapy_type admin_therapy_type_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_therapy_type
    ADD CONSTRAINT admin_therapy_type_pkey PRIMARY KEY (tht_id);


--
-- TOC entry 5060 (class 2606 OID 20972)
-- Name: audi_sql_events_register audi_sql_events_register_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.audi_sql_events_register
    ADD CONSTRAINT audi_sql_events_register_pkey PRIMARY KEY (ser_id);


--
-- TOC entry 5062 (class 2606 OID 20982)
-- Name: audi_tables audi_tables_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.audi_tables
    ADD CONSTRAINT audi_tables_pkey PRIMARY KEY (aut_id);


--
-- TOC entry 5064 (class 2606 OID 20992)
-- Name: clinic_allergy_catalog clinic_allergy_catalog_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_allergy_catalog
    ADD CONSTRAINT clinic_allergy_catalog_pkey PRIMARY KEY (al_id);


--
-- TOC entry 5098 (class 2606 OID 21144)
-- Name: clinic_blood_type clinic_blood_type_btp_type_key; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_blood_type
    ADD CONSTRAINT clinic_blood_type_btp_type_key UNIQUE (btp_type);


--
-- TOC entry 5100 (class 2606 OID 21142)
-- Name: clinic_blood_type clinic_blood_type_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_blood_type
    ADD CONSTRAINT clinic_blood_type_pkey PRIMARY KEY (btp_id);


--
-- TOC entry 5102 (class 2606 OID 21153)
-- Name: clinic_consent_record clinic_consent_record_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_consent_record
    ADD CONSTRAINT clinic_consent_record_pkey PRIMARY KEY (con_id);


--
-- TOC entry 5066 (class 2606 OID 21002)
-- Name: clinic_disease_catalog clinic_disease_catalog_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_disease_catalog
    ADD CONSTRAINT clinic_disease_catalog_pkey PRIMARY KEY (dis_id);


--
-- TOC entry 5068 (class 2606 OID 21012)
-- Name: clinic_disease_type clinic_disease_type_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_disease_type
    ADD CONSTRAINT clinic_disease_type_pkey PRIMARY KEY (dst_id);


--
-- TOC entry 5070 (class 2606 OID 21021)
-- Name: clinic_patient_allergy clinic_patient_allergy_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_patient_allergy
    ADD CONSTRAINT clinic_patient_allergy_pkey PRIMARY KEY (pa_id);


--
-- TOC entry 5072 (class 2606 OID 21031)
-- Name: clinic_patient_disease clinic_patient_disease_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_patient_disease
    ADD CONSTRAINT clinic_patient_disease_pkey PRIMARY KEY (pd_id);


--
-- TOC entry 5074 (class 2606 OID 21040)
-- Name: clinic_patient_medical_history clinic_patient_medical_history_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_patient_medical_history
    ADD CONSTRAINT clinic_patient_medical_history_pkey PRIMARY KEY (hist_id);


--
-- TOC entry 5076 (class 2606 OID 21049)
-- Name: clinic_session_control clinic_session_control_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_session_control
    ADD CONSTRAINT clinic_session_control_pkey PRIMARY KEY (sec_id);


--
-- TOC entry 5078 (class 2606 OID 21058)
-- Name: segu_login segu_login_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_login
    ADD CONSTRAINT segu_login_pkey PRIMARY KEY (slo_id);


--
-- TOC entry 5080 (class 2606 OID 21068)
-- Name: segu_menu segu_menu_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_menu
    ADD CONSTRAINT segu_menu_pkey PRIMARY KEY (menu_id);


--
-- TOC entry 5082 (class 2606 OID 21076)
-- Name: segu_menu_rol segu_menu_rol_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_menu_rol
    ADD CONSTRAINT segu_menu_rol_pkey PRIMARY KEY (mr_id);


--
-- TOC entry 5084 (class 2606 OID 21086)
-- Name: segu_module segu_module_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_module
    ADD CONSTRAINT segu_module_pkey PRIMARY KEY (mod_id);


--
-- TOC entry 5086 (class 2606 OID 21097)
-- Name: segu_rol segu_rol_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_rol
    ADD CONSTRAINT segu_rol_pkey PRIMARY KEY (rol_id);


--
-- TOC entry 5094 (class 2606 OID 21125)
-- Name: segu_user_notification segu_user_notification_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_user_notification
    ADD CONSTRAINT segu_user_notification_pkey PRIMARY KEY (sun_id);


--
-- TOC entry 5088 (class 2606 OID 21110)
-- Name: segu_user segu_user_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_user
    ADD CONSTRAINT segu_user_pkey PRIMARY KEY (user_id);


--
-- TOC entry 5096 (class 2606 OID 21132)
-- Name: segu_user_rol segu_user_rol_pkey; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_user_rol
    ADD CONSTRAINT segu_user_rol_pkey PRIMARY KEY (id_user_rol);


--
-- TOC entry 5090 (class 2606 OID 21112)
-- Name: segu_user segu_user_user_login_id_key; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_user
    ADD CONSTRAINT segu_user_user_login_id_key UNIQUE (user_login_id);


--
-- TOC entry 5092 (class 2606 OID 21114)
-- Name: segu_user segu_user_user_mail_key; Type: CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_user
    ADD CONSTRAINT segu_user_user_mail_key UNIQUE (user_mail);


--
-- TOC entry 5116 (class 2606 OID 21359)
-- Name: admin_patient admin_patient_pat_blood_type_fkey; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_patient
    ADD CONSTRAINT admin_patient_pat_blood_type_fkey FOREIGN KEY (pat_blood_type) REFERENCES ceragen.clinic_blood_type(btp_id);


--
-- TOC entry 5123 (class 2606 OID 21249)
-- Name: audi_sql_events_register audi_sql_events_register_ser_table_id_fkey; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.audi_sql_events_register
    ADD CONSTRAINT audi_sql_events_register_ser_table_id_fkey FOREIGN KEY (ser_table_id) REFERENCES ceragen.audi_tables(aut_id);


--
-- TOC entry 5124 (class 2606 OID 21254)
-- Name: audi_sql_events_register audi_sql_events_register_ser_user_process_id_fkey; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.audi_sql_events_register
    ADD CONSTRAINT audi_sql_events_register_ser_user_process_id_fkey FOREIGN KEY (ser_user_process_id) REFERENCES ceragen.segu_user(user_id);


--
-- TOC entry 5145 (class 2606 OID 21364)
-- Name: clinic_consent_record clinic_consent_record_con_patient_id_fkey; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_consent_record
    ADD CONSTRAINT clinic_consent_record_con_patient_id_fkey FOREIGN KEY (con_patient_id) REFERENCES ceragen.admin_patient(pat_id);


--
-- TOC entry 5103 (class 2606 OID 21154)
-- Name: admin_client fk_client_person; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_client
    ADD CONSTRAINT fk_client_person FOREIGN KEY (cli_person_id) REFERENCES ceragen.admin_person(per_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5125 (class 2606 OID 21344)
-- Name: clinic_disease_catalog fk_dis_type; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_disease_catalog
    ADD CONSTRAINT fk_dis_type FOREIGN KEY (dis_type_id) REFERENCES ceragen.clinic_disease_type(dst_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5104 (class 2606 OID 21159)
-- Name: admin_expense fk_expense_type; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_expense
    ADD CONSTRAINT fk_expense_type FOREIGN KEY (exp_type_id) REFERENCES ceragen.admin_expense_type(ext_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5130 (class 2606 OID 21269)
-- Name: clinic_patient_medical_history fk_hist_patient; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_patient_medical_history
    ADD CONSTRAINT fk_hist_patient FOREIGN KEY (hist_patient_id) REFERENCES ceragen.admin_patient(pat_id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- TOC entry 5108 (class 2606 OID 21179)
-- Name: admin_invoice_detail fk_ind_invoice; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice_detail
    ADD CONSTRAINT fk_ind_invoice FOREIGN KEY (ind_invoice_id) REFERENCES ceragen.admin_invoice(inv_id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- TOC entry 5109 (class 2606 OID 21184)
-- Name: admin_invoice_detail fk_ind_product; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice_detail
    ADD CONSTRAINT fk_ind_product FOREIGN KEY (ind_product_id) REFERENCES ceragen.admin_product(pro_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5110 (class 2606 OID 21189)
-- Name: admin_invoice_payment fk_inp_invoice; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice_payment
    ADD CONSTRAINT fk_inp_invoice FOREIGN KEY (inp_invoice_id) REFERENCES ceragen.admin_invoice(inv_id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- TOC entry 5111 (class 2606 OID 21194)
-- Name: admin_invoice_payment fk_inp_payment_method; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice_payment
    ADD CONSTRAINT fk_inp_payment_method FOREIGN KEY (inp_payment_method_id) REFERENCES ceragen.admin_payment_method(pme_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5112 (class 2606 OID 21199)
-- Name: admin_invoice_tax fk_int_invoice; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice_tax
    ADD CONSTRAINT fk_int_invoice FOREIGN KEY (int_invoice_id) REFERENCES ceragen.admin_invoice(inv_id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- TOC entry 5113 (class 2606 OID 21204)
-- Name: admin_invoice_tax fk_int_tax; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice_tax
    ADD CONSTRAINT fk_int_tax FOREIGN KEY (int_tax_id) REFERENCES ceragen.admin_tax(tax_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5106 (class 2606 OID 21169)
-- Name: admin_invoice fk_invoice_client; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice
    ADD CONSTRAINT fk_invoice_client FOREIGN KEY (inv_client_id) REFERENCES ceragen.admin_person(per_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5107 (class 2606 OID 21174)
-- Name: admin_invoice fk_invoice_patient; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_invoice
    ADD CONSTRAINT fk_invoice_patient FOREIGN KEY (inv_patient_id) REFERENCES ceragen.admin_patient(pat_id) ON UPDATE RESTRICT ON DELETE SET NULL;


--
-- TOC entry 5114 (class 2606 OID 21209)
-- Name: admin_medical_staff fk_med_person; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_medical_staff
    ADD CONSTRAINT fk_med_person FOREIGN KEY (med_person_id) REFERENCES ceragen.admin_person(per_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5115 (class 2606 OID 21214)
-- Name: admin_medical_staff fk_med_type; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_medical_staff
    ADD CONSTRAINT fk_med_type FOREIGN KEY (med_type_id) REFERENCES ceragen.admin_medic_person_type(mpt_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5136 (class 2606 OID 21299)
-- Name: segu_menu fk_menu_parent; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_menu
    ADD CONSTRAINT fk_menu_parent FOREIGN KEY (menu_parent_id) REFERENCES ceragen.segu_menu(menu_id);


--
-- TOC entry 5126 (class 2606 OID 21349)
-- Name: clinic_patient_allergy fk_pa_allergy; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_patient_allergy
    ADD CONSTRAINT fk_pa_allergy FOREIGN KEY (pa_allergy_id) REFERENCES ceragen.clinic_allergy_catalog(al_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5127 (class 2606 OID 21259)
-- Name: clinic_patient_allergy fk_pa_patient; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_patient_allergy
    ADD CONSTRAINT fk_pa_patient FOREIGN KEY (pa_patient_id) REFERENCES ceragen.admin_patient(pat_id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- TOC entry 5117 (class 2606 OID 21219)
-- Name: admin_patient fk_patient_client; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_patient
    ADD CONSTRAINT fk_patient_client FOREIGN KEY (pat_client_id) REFERENCES ceragen.admin_client(cli_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5118 (class 2606 OID 21224)
-- Name: admin_patient fk_patient_person; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_patient
    ADD CONSTRAINT fk_patient_person FOREIGN KEY (pat_person_id) REFERENCES ceragen.admin_person(per_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5105 (class 2606 OID 21164)
-- Name: admin_expense fk_payment_method; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_expense
    ADD CONSTRAINT fk_payment_method FOREIGN KEY (exp_payment_method_id) REFERENCES ceragen.admin_payment_method(pme_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5128 (class 2606 OID 21354)
-- Name: clinic_patient_disease fk_pd_disease; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_patient_disease
    ADD CONSTRAINT fk_pd_disease FOREIGN KEY (pd_disease_id) REFERENCES ceragen.clinic_disease_catalog(dis_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5129 (class 2606 OID 21264)
-- Name: clinic_patient_disease fk_pd_patient; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_patient_disease
    ADD CONSTRAINT fk_pd_patient FOREIGN KEY (pd_patient_id) REFERENCES ceragen.admin_patient(pat_id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- TOC entry 5119 (class 2606 OID 21229)
-- Name: admin_person fk_person_genre; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_person
    ADD CONSTRAINT fk_person_genre FOREIGN KEY (per_genre_id) REFERENCES ceragen.admin_person_genre(id);


--
-- TOC entry 5120 (class 2606 OID 21234)
-- Name: admin_person fk_person_marital_status; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_person
    ADD CONSTRAINT fk_person_marital_status FOREIGN KEY (per_marital_status_id) REFERENCES ceragen.admin_marital_status(id);


--
-- TOC entry 5122 (class 2606 OID 21244)
-- Name: admin_product_promotion fk_promotion_product; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_product_promotion
    ADD CONSTRAINT fk_promotion_product FOREIGN KEY (ppr_product_id) REFERENCES ceragen.admin_product(pro_id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- TOC entry 5131 (class 2606 OID 21274)
-- Name: clinic_session_control fk_ses_invoice; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_session_control
    ADD CONSTRAINT fk_ses_invoice FOREIGN KEY (sec_inv_id) REFERENCES ceragen.admin_invoice(inv_id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- TOC entry 5132 (class 2606 OID 21279)
-- Name: clinic_session_control fk_ses_medical_staff; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_session_control
    ADD CONSTRAINT fk_ses_medical_staff FOREIGN KEY (sec_med_staff_id) REFERENCES ceragen.admin_medical_staff(med_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5133 (class 2606 OID 21284)
-- Name: clinic_session_control fk_ses_product; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_session_control
    ADD CONSTRAINT fk_ses_product FOREIGN KEY (sec_pro_id) REFERENCES ceragen.admin_product(pro_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5134 (class 2606 OID 21289)
-- Name: clinic_session_control fk_ses_therapy_type; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.clinic_session_control
    ADD CONSTRAINT fk_ses_therapy_type FOREIGN KEY (sec_typ_id) REFERENCES ceragen.admin_therapy_type(tht_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5121 (class 2606 OID 21239)
-- Name: admin_product fk_therapy_type; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.admin_product
    ADD CONSTRAINT fk_therapy_type FOREIGN KEY (pro_therapy_type_id) REFERENCES ceragen.admin_therapy_type(tht_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 5140 (class 2606 OID 21319)
-- Name: segu_user fk_user_person; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_user
    ADD CONSTRAINT fk_user_person FOREIGN KEY (user_person_id) REFERENCES ceragen.admin_person(per_id);


--
-- TOC entry 5135 (class 2606 OID 21294)
-- Name: segu_login segu_login_slo_user_id_fkey; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_login
    ADD CONSTRAINT segu_login_slo_user_id_fkey FOREIGN KEY (slo_user_id) REFERENCES ceragen.segu_user(user_id);


--
-- TOC entry 5137 (class 2606 OID 21304)
-- Name: segu_menu segu_menu_menu_module_id_fkey; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_menu
    ADD CONSTRAINT segu_menu_menu_module_id_fkey FOREIGN KEY (menu_module_id) REFERENCES ceragen.segu_module(mod_id);


--
-- TOC entry 5138 (class 2606 OID 21309)
-- Name: segu_menu_rol segu_menu_rol_mr_menu_id_fkey; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_menu_rol
    ADD CONSTRAINT segu_menu_rol_mr_menu_id_fkey FOREIGN KEY (mr_menu_id) REFERENCES ceragen.segu_menu(menu_id);


--
-- TOC entry 5139 (class 2606 OID 21314)
-- Name: segu_menu_rol segu_menu_rol_mr_rol_id_fkey; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_menu_rol
    ADD CONSTRAINT segu_menu_rol_mr_rol_id_fkey FOREIGN KEY (mr_rol_id) REFERENCES ceragen.segu_rol(rol_id);


--
-- TOC entry 5141 (class 2606 OID 21324)
-- Name: segu_user_notification segu_user_notification_sun_user_destination_id_fkey; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_user_notification
    ADD CONSTRAINT segu_user_notification_sun_user_destination_id_fkey FOREIGN KEY (sun_user_destination_id) REFERENCES ceragen.segu_user(user_id);


--
-- TOC entry 5142 (class 2606 OID 21329)
-- Name: segu_user_notification segu_user_notification_sun_user_source_id_fkey; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_user_notification
    ADD CONSTRAINT segu_user_notification_sun_user_source_id_fkey FOREIGN KEY (sun_user_source_id) REFERENCES ceragen.segu_user(user_id);


--
-- TOC entry 5143 (class 2606 OID 21334)
-- Name: segu_user_rol segu_user_rol_id_rol_fkey; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_user_rol
    ADD CONSTRAINT segu_user_rol_id_rol_fkey FOREIGN KEY (id_rol) REFERENCES ceragen.segu_rol(rol_id);


--
-- TOC entry 5144 (class 2606 OID 21339)
-- Name: segu_user_rol segu_user_rol_id_user_fkey; Type: FK CONSTRAINT; Schema: ceragen; Owner: postgres
--

ALTER TABLE ONLY ceragen.segu_user_rol
    ADD CONSTRAINT segu_user_rol_id_user_fkey FOREIGN KEY (id_user) REFERENCES ceragen.segu_user(user_id);


-- Completed on 2025-07-07 16:12:43

--
-- PostgreSQL database dump complete
--

