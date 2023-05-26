export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _deprecated_deals: {
        Row: {
          accept_crypto: boolean
          advisor_type: string | null
          asset_id: string | null
          asset_type: string | null
          bank_account_id: string | null
          banking_provider: string | null
          carry_fee: number | null
          closing_date: string
          created_at: string
          deal_term: string
          description: string | null
          documents_provider: string | null
          documents_template_id: string | null
          entity_id: string | null
          entity_name: string | null
          estimated_multiple: number | null
          id: string
          international_investors: boolean | null
          is_migration: boolean | null
          legacy_company_name: string | null
          legal_template_option: string | null
          management_fee_frequency: string
          management_fee_percent: number | null
          master_series: string | null
          minimum_investment: number | null
          mongo_deal_id: string | null
          mongo_organization_id: string | null
          mongo_user_id: string | null
          name: string | null
          offering_type: string | null
          onboarding_link: string | null
          organization_id: string | null
          series_name: string | null
          slug: string | null
          status: string
          sub_type: string | null
          target_raise_goal: number | null
          total_carry: number | null
          type: string
          updated_at: string
          user_email: string | null
        }
        Insert: {
          accept_crypto?: boolean
          advisor_type?: string | null
          asset_id?: string | null
          asset_type?: string | null
          bank_account_id?: string | null
          banking_provider?: string | null
          carry_fee?: number | null
          closing_date?: string
          created_at?: string
          deal_term?: string
          description?: string | null
          documents_provider?: string | null
          documents_template_id?: string | null
          entity_id?: string | null
          entity_name?: string | null
          estimated_multiple?: number | null
          id?: string
          international_investors?: boolean | null
          is_migration?: boolean | null
          legacy_company_name?: string | null
          legal_template_option?: string | null
          management_fee_frequency?: string
          management_fee_percent?: number | null
          master_series?: string | null
          minimum_investment?: number | null
          mongo_deal_id?: string | null
          mongo_organization_id?: string | null
          mongo_user_id?: string | null
          name?: string | null
          offering_type?: string | null
          onboarding_link?: string | null
          organization_id?: string | null
          series_name?: string | null
          slug?: string | null
          status?: string
          sub_type?: string | null
          target_raise_goal?: number | null
          total_carry?: number | null
          type?: string
          updated_at?: string
          user_email?: string | null
        }
        Update: {
          accept_crypto?: boolean
          advisor_type?: string | null
          asset_id?: string | null
          asset_type?: string | null
          bank_account_id?: string | null
          banking_provider?: string | null
          carry_fee?: number | null
          closing_date?: string
          created_at?: string
          deal_term?: string
          description?: string | null
          documents_provider?: string | null
          documents_template_id?: string | null
          entity_id?: string | null
          entity_name?: string | null
          estimated_multiple?: number | null
          id?: string
          international_investors?: boolean | null
          is_migration?: boolean | null
          legacy_company_name?: string | null
          legal_template_option?: string | null
          management_fee_frequency?: string
          management_fee_percent?: number | null
          master_series?: string | null
          minimum_investment?: number | null
          mongo_deal_id?: string | null
          mongo_organization_id?: string | null
          mongo_user_id?: string | null
          name?: string | null
          offering_type?: string | null
          onboarding_link?: string | null
          organization_id?: string | null
          series_name?: string | null
          slug?: string | null
          status?: string
          sub_type?: string | null
          target_raise_goal?: number | null
          total_carry?: number | null
          type?: string
          updated_at?: string
          user_email?: string | null
        }
      }
      _deprecated_deals_details: {
        Row: {
          amount_raised: number | null
          company_description: string | null
          created_at: string | null
          deal_id: string | null
          id: number
          last_valuation: string | null
          logo: string | null
          memo: string | null
          mongo_deal_id: string | null
          onboarding_link: string | null
          pledge_link: string | null
          sector: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          amount_raised?: number | null
          company_description?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: number
          last_valuation?: string | null
          logo?: string | null
          memo?: string | null
          mongo_deal_id?: string | null
          onboarding_link?: string | null
          pledge_link?: string | null
          sector?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          amount_raised?: number | null
          company_description?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: number
          last_valuation?: string | null
          logo?: string | null
          memo?: string | null
          mongo_deal_id?: string | null
          onboarding_link?: string | null
          pledge_link?: string | null
          sector?: string | null
          title?: string | null
          updated_at?: string | null
        }
      }
      _organization_roles: {
        Row: {
          _id: string
          created_at: string | null
          mongo_organization_id: string | null
          mongo_user_id: string | null
          organization_id: string | null
          passport_id: string | null
          type: string | null
          user_email: string | null
        }
        Insert: {
          _id: string
          created_at?: string | null
          mongo_organization_id?: string | null
          mongo_user_id?: string | null
          organization_id?: string | null
          passport_id?: string | null
          type?: string | null
          user_email?: string | null
        }
        Update: {
          _id?: string
          created_at?: string | null
          mongo_organization_id?: string | null
          mongo_user_id?: string | null
          organization_id?: string | null
          passport_id?: string | null
          type?: string | null
          user_email?: string | null
        }
      }
      accreditations: {
        Row: {
          created_at: string
          description: string | null
          id: string
          type: string | null
          user_email: string | null
          user_investment_entity_id: string | null
          value: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          type?: string | null
          user_email?: string | null
          user_investment_entity_id?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          type?: string | null
          user_email?: string | null
          user_investment_entity_id?: string | null
          value?: string | null
        }
      }
      accreditations_506b: {
        Row: {
          accreditation_id: string | null
          created_at: string
          id: string
        }
        Insert: {
          accreditation_id?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          accreditation_id?: string | null
          created_at?: string
          id?: string
        }
      }
      accreditations_506c: {
        Row: {
          accreditation_id: string | null
          created_at: string
          id: string
        }
        Insert: {
          accreditation_id?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          accreditation_id?: string | null
          created_at?: string
          id?: string
        }
      }
      accreditations_qualified_purchaser: {
        Row: {
          accreditation_id: string | null
          created_at: string
          id: string
        }
        Insert: {
          accreditation_id?: string | null
          created_at?: string
          id?: string
        }
        Update: {
          accreditation_id?: string | null
          created_at?: string
          id?: string
        }
      }
      assets: {
        Row: {
          company_website: string | null
          created_at: string
          deal_id: string | null
          id: string
          legal_name: string | null
          purchase_agreement_id: string | null
          security_type: string | null
          type: string | null
          wire_instructions_id: string | null
        }
        Insert: {
          company_website?: string | null
          created_at?: string
          deal_id?: string | null
          id?: string
          legal_name?: string | null
          purchase_agreement_id?: string | null
          security_type?: string | null
          type?: string | null
          wire_instructions_id?: string | null
        }
        Update: {
          company_website?: string | null
          created_at?: string
          deal_id?: string | null
          id?: string
          legal_name?: string | null
          purchase_agreement_id?: string | null
          security_type?: string | null
          type?: string | null
          wire_instructions_id?: string | null
        }
      }
      assets_valuation: {
        Row: {
          amount: number | null
          asset_id: string | null
          created_at: string | null
          id: string
          interest_rate: number | null
          type: string | null
        }
        Insert: {
          amount?: number | null
          asset_id?: string | null
          created_at?: string | null
          id?: string
          interest_rate?: number | null
          type?: string | null
        }
        Update: {
          amount?: number | null
          asset_id?: string | null
          created_at?: string | null
          id?: string
          interest_rate?: number | null
          type?: string | null
        }
      }
      audit_log: {
        Row: {
          after_value: Json | null
          before_value: Json | null
          created_at: string | null
          email: string | null
          id: string
          row_ID: string | null
          table_name: string | null
        }
        Insert: {
          after_value?: Json | null
          before_value?: Json | null
          created_at?: string | null
          email?: string | null
          id?: string
          row_ID?: string | null
          table_name?: string | null
        }
        Update: {
          after_value?: Json | null
          before_value?: Json | null
          created_at?: string | null
          email?: string | null
          id?: string
          row_ID?: string | null
          table_name?: string | null
        }
      }
      deal_details: {
        Row: {
          accept_crypto: boolean | null
          advisor_type: string | null
          agree_costs: boolean | null
          agree_msa: boolean | null
          agree_setup: boolean | null
          asset_id: string | null
          bank_account_id: string | null
          banking_provider: string | null
          deal_id: string | null
          deal_term: string | null
          documents_provider: string | null
          documents_template_id: string | null
          entity_name: string | null
          estimated_multiple: number | null
          id: string
          international_investors: boolean | null
          legacy_company_name: string | null
          legal_template_option: string | null
          master_series: string | null
          onboarding_link: string | null
          series_name: string | null
          sub_type: string | null
          total_carry: number | null
        }
        Insert: {
          accept_crypto?: boolean | null
          advisor_type?: string | null
          agree_costs?: boolean | null
          agree_msa?: boolean | null
          agree_setup?: boolean | null
          asset_id?: string | null
          bank_account_id?: string | null
          banking_provider?: string | null
          deal_id?: string | null
          deal_term?: string | null
          documents_provider?: string | null
          documents_template_id?: string | null
          entity_name?: string | null
          estimated_multiple?: number | null
          id?: string
          international_investors?: boolean | null
          legacy_company_name?: string | null
          legal_template_option?: string | null
          master_series?: string | null
          onboarding_link?: string | null
          series_name?: string | null
          sub_type?: string | null
          total_carry?: number | null
        }
        Update: {
          accept_crypto?: boolean | null
          advisor_type?: string | null
          agree_costs?: boolean | null
          agree_msa?: boolean | null
          agree_setup?: boolean | null
          asset_id?: string | null
          bank_account_id?: string | null
          banking_provider?: string | null
          deal_id?: string | null
          deal_term?: string | null
          documents_provider?: string | null
          documents_template_id?: string | null
          entity_name?: string | null
          estimated_multiple?: number | null
          id?: string
          international_investors?: boolean | null
          legacy_company_name?: string | null
          legal_template_option?: string | null
          master_series?: string | null
          onboarding_link?: string | null
          series_name?: string | null
          sub_type?: string | null
          total_carry?: number | null
        }
      }
      deals: {
        Row: {
          closing_date: string | null
          created_at: string | null
          documents_provider: string | null
          documents_template_id: string | null
          entity_id: string | null
          id: string
          is_migration: boolean | null
          management_fee_frequency: string | null
          management_fee_percent: number | null
          memo: string | null
          minimum_investment: number | null
          mongo_deal_id: string | null
          mongo_organization_id: string | null
          name: string | null
          offering_type: string | null
          organization_id: string | null
          shortcode_id: string | null
          slug: string | null
          status: string | null
          sub_type: string | null
          target_raise_goal: number | null
          total_carry: number | null
          type: string | null
          updated_at: string | null
          user_email: string | null
        }
        Insert: {
          closing_date?: string | null
          created_at?: string | null
          documents_provider?: string | null
          documents_template_id?: string | null
          entity_id?: string | null
          id?: string
          is_migration?: boolean | null
          management_fee_frequency?: string | null
          management_fee_percent?: number | null
          memo?: string | null
          minimum_investment?: number | null
          mongo_deal_id?: string | null
          mongo_organization_id?: string | null
          name?: string | null
          offering_type?: string | null
          organization_id?: string | null
          shortcode_id?: string | null
          slug?: string | null
          status?: string | null
          sub_type?: string | null
          target_raise_goal?: number | null
          total_carry?: number | null
          type?: string | null
          updated_at?: string | null
          user_email?: string | null
        }
        Update: {
          closing_date?: string | null
          created_at?: string | null
          documents_provider?: string | null
          documents_template_id?: string | null
          entity_id?: string | null
          id?: string
          is_migration?: boolean | null
          management_fee_frequency?: string | null
          management_fee_percent?: number | null
          memo?: string | null
          minimum_investment?: number | null
          mongo_deal_id?: string | null
          mongo_organization_id?: string | null
          name?: string | null
          offering_type?: string | null
          organization_id?: string | null
          shortcode_id?: string | null
          slug?: string | null
          status?: string | null
          sub_type?: string | null
          target_raise_goal?: number | null
          total_carry?: number | null
          type?: string | null
          updated_at?: string | null
          user_email?: string | null
        }
      }
      deals_compliance: {
        Row: {
          ccc: string | null
          cik_code: string | null
          cik_password: string | null
          created_at: string | null
          deal_id: string | null
          id: number
          pmac: string | null
        }
        Insert: {
          ccc?: string | null
          cik_code?: string | null
          cik_password?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: number
          pmac?: string | null
        }
        Update: {
          ccc?: string | null
          cik_code?: string | null
          cik_password?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: number
          pmac?: string | null
        }
      }
      deals_duplicate: {
        Row: {
          carry_fee: number | null
          closing_date: string | null
          created_at: string | null
          documents_provider: string | null
          documents_template_id: string | null
          entity_id: string | null
          id: string
          is_migration: boolean | null
          management_fee_frequency: string | null
          management_fee_percent: number | null
          memo: string | null
          minimum_investment: number | null
          mongo_deal_id: string | null
          mongo_organization_id: string | null
          name: string | null
          offering_type: string | null
          organization_id: string | null
          shortcode_id: string | null
          slug: string | null
          status: string | null
          sub_type: string | null
          target_raise_goal: number | null
          total_carry: number | null
          type: string | null
          updated_at: string | null
          user_email: string | null
        }
        Insert: {
          carry_fee?: number | null
          closing_date?: string | null
          created_at?: string | null
          documents_provider?: string | null
          documents_template_id?: string | null
          entity_id?: string | null
          id?: string
          is_migration?: boolean | null
          management_fee_frequency?: string | null
          management_fee_percent?: number | null
          memo?: string | null
          minimum_investment?: number | null
          mongo_deal_id?: string | null
          mongo_organization_id?: string | null
          name?: string | null
          offering_type?: string | null
          organization_id?: string | null
          shortcode_id?: string | null
          slug?: string | null
          status?: string | null
          sub_type?: string | null
          target_raise_goal?: number | null
          total_carry?: number | null
          type?: string | null
          updated_at?: string | null
          user_email?: string | null
        }
        Update: {
          carry_fee?: number | null
          closing_date?: string | null
          created_at?: string | null
          documents_provider?: string | null
          documents_template_id?: string | null
          entity_id?: string | null
          id?: string
          is_migration?: boolean | null
          management_fee_frequency?: string | null
          management_fee_percent?: number | null
          memo?: string | null
          minimum_investment?: number | null
          mongo_deal_id?: string | null
          mongo_organization_id?: string | null
          name?: string | null
          offering_type?: string | null
          organization_id?: string | null
          shortcode_id?: string | null
          slug?: string | null
          status?: string | null
          sub_type?: string | null
          target_raise_goal?: number | null
          total_carry?: number | null
          type?: string | null
          updated_at?: string | null
          user_email?: string | null
        }
      }
      deals_files: {
        Row: {
          deals_id: string | null
          files_id: string | null
          id: string
        }
        Insert: {
          deals_id?: string | null
          files_id?: string | null
          id?: string
        }
        Update: {
          deals_id?: string | null
          files_id?: string | null
          id?: string
        }
      }
      deals_funds_investments: {
        Row: {
          company: string | null
          created_at: string | null
          deal_id: string | null
          id: number
          invested_amount: string | null
          mongo_deal_id: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: number
          invested_amount?: string | null
          mongo_deal_id?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: number
          invested_amount?: string | null
          mongo_deal_id?: string | null
        }
      }
      deals_tasks: {
        Row: {
          action_name: string | null
          assigned_to: string | null
          created_at: string | null
          deal_audit: boolean | null
          deal_audit_owner: string | null
          deal_notes: string | null
          deals_id: string | null
          deals_tasks_id: number
          task_complete: boolean | null
          task_due_date: string | null
          task_rag: string | null
          task_watchers: string | null
        }
        Insert: {
          action_name?: string | null
          assigned_to?: string | null
          created_at?: string | null
          deal_audit?: boolean | null
          deal_audit_owner?: string | null
          deal_notes?: string | null
          deals_id?: string | null
          deals_tasks_id?: number
          task_complete?: boolean | null
          task_due_date?: string | null
          task_rag?: string | null
          task_watchers?: string | null
        }
        Update: {
          action_name?: string | null
          assigned_to?: string | null
          created_at?: string | null
          deal_audit?: boolean | null
          deal_audit_owner?: string | null
          deal_notes?: string | null
          deals_id?: string | null
          deals_tasks_id?: number
          task_complete?: boolean | null
          task_due_date?: string | null
          task_rag?: string | null
          task_watchers?: string | null
        }
      }
      deals_with_slug: {
        Row: {
          __v: number | null
          _id: string | null
          name: string | null
          organization_id: string | null
          organization_name: string | null
          series_name: string | null
          slug: string | null
          type: string | null
          updated_at: string | null
          user_email: string | null
          user_id: string | null
          wire_deadline: string | null
        }
        Insert: {
          __v?: number | null
          _id?: string | null
          name?: string | null
          organization_id?: string | null
          organization_name?: string | null
          series_name?: string | null
          slug?: string | null
          type?: string | null
          updated_at?: string | null
          user_email?: string | null
          user_id?: string | null
          wire_deadline?: string | null
        }
        Update: {
          __v?: number | null
          _id?: string | null
          name?: string | null
          organization_id?: string | null
          organization_name?: string | null
          series_name?: string | null
          slug?: string | null
          type?: string | null
          updated_at?: string | null
          user_email?: string | null
          user_id?: string | null
          wire_deadline?: string | null
        }
      }
      entities: {
        Row: {
          created_at: string | null
          ein: string | null
          fund_manager: string | null
          id: string
          is_migration: boolean | null
          mongo_deal_id: string | null
          mongo_organization_id: string | null
          name: string | null
          organization_id: string | null
          organization_name: string | null
          return_id: string | null
          tax_status: string | null
          user_email: string | null
        }
        Insert: {
          created_at?: string | null
          ein?: string | null
          fund_manager?: string | null
          id?: string
          is_migration?: boolean | null
          mongo_deal_id?: string | null
          mongo_organization_id?: string | null
          name?: string | null
          organization_id?: string | null
          organization_name?: string | null
          return_id?: string | null
          tax_status?: string | null
          user_email?: string | null
        }
        Update: {
          created_at?: string | null
          ein?: string | null
          fund_manager?: string | null
          id?: string
          is_migration?: boolean | null
          mongo_deal_id?: string | null
          mongo_organization_id?: string | null
          name?: string | null
          organization_id?: string | null
          organization_name?: string | null
          return_id?: string | null
          tax_status?: string | null
          user_email?: string | null
        }
      }
      entities_taxes: {
        Row: {
          created_at: string | null
          entity_beginning_capital: number | null
          entity_beginning_cash: number | null
          entity_beginning_current_liabilities: number | null
          entity_beginning_long_term_assets: number | null
          entity_capital_contributions: number | null
          entity_cash_distributions: number | null
          entity_city: string | null
          entity_ein: string | null
          entity_ending_cash: number | null
          entity_ending_current_liabilities: number | null
          entity_ending_long_term_assets: number | null
          entity_formation_date: string | null
          entity_has_foreign_investors: boolean
          entity_id: string | null
          entity_name: string | null
          entity_phone_number: string | null
          entity_portfolio_expense: number | null
          entity_postal_code: string | null
          entity_satisfies_receipts_and_assets: boolean
          entity_state: string | null
          entity_street_address: string | null
          entity_type: string | null
          extension_filed: boolean
          filing_id: string | null
          filing_status: string | null
          id: string
          is_amendment_return: boolean
          is_final_return: boolean
          is_initial_return: boolean
          partnership_representative_city: string | null
          partnership_representative_designated_individual_city: string | null
          partnership_representative_designated_individual_email: string | null
          partnership_representative_designated_individual_first_name:
            | string
            | null
          partnership_representative_designated_individual_last_name:
            | string
            | null
          partnership_representative_designated_individual_phone: string | null
          partnership_representative_designated_individual_state: string | null
          partnership_representative_designated_individual_street_address:
            | string
            | null
          partnership_representative_designated_individual_zip: string | null
          partnership_representative_name: string | null
          partnership_representative_phone: string | null
          partnership_representative_state: string | null
          partnership_representative_street_address: string | null
          partnership_representative_zip: string | null
          portfolio_expense_description: string | null
          provider: string | null
          provider_id: string | null
          signer_first_name: string | null
          signer_last_name: string | null
          signer_signature: string | null
          signer_signature_date: string | null
          signer_title: string | null
          tax_type: string | null
          tax_year: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          entity_beginning_capital?: number | null
          entity_beginning_cash?: number | null
          entity_beginning_current_liabilities?: number | null
          entity_beginning_long_term_assets?: number | null
          entity_capital_contributions?: number | null
          entity_cash_distributions?: number | null
          entity_city?: string | null
          entity_ein?: string | null
          entity_ending_cash?: number | null
          entity_ending_current_liabilities?: number | null
          entity_ending_long_term_assets?: number | null
          entity_formation_date?: string | null
          entity_has_foreign_investors?: boolean
          entity_id?: string | null
          entity_name?: string | null
          entity_phone_number?: string | null
          entity_portfolio_expense?: number | null
          entity_postal_code?: string | null
          entity_satisfies_receipts_and_assets?: boolean
          entity_state?: string | null
          entity_street_address?: string | null
          entity_type?: string | null
          extension_filed?: boolean
          filing_id?: string | null
          filing_status?: string | null
          id?: string
          is_amendment_return?: boolean
          is_final_return?: boolean
          is_initial_return?: boolean
          partnership_representative_city?: string | null
          partnership_representative_designated_individual_city?: string | null
          partnership_representative_designated_individual_email?: string | null
          partnership_representative_designated_individual_first_name?:
            | string
            | null
          partnership_representative_designated_individual_last_name?:
            | string
            | null
          partnership_representative_designated_individual_phone?: string | null
          partnership_representative_designated_individual_state?: string | null
          partnership_representative_designated_individual_street_address?:
            | string
            | null
          partnership_representative_designated_individual_zip?: string | null
          partnership_representative_name?: string | null
          partnership_representative_phone?: string | null
          partnership_representative_state?: string | null
          partnership_representative_street_address?: string | null
          partnership_representative_zip?: string | null
          portfolio_expense_description?: string | null
          provider?: string | null
          provider_id?: string | null
          signer_first_name?: string | null
          signer_last_name?: string | null
          signer_signature?: string | null
          signer_signature_date?: string | null
          signer_title?: string | null
          tax_type?: string | null
          tax_year?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          entity_beginning_capital?: number | null
          entity_beginning_cash?: number | null
          entity_beginning_current_liabilities?: number | null
          entity_beginning_long_term_assets?: number | null
          entity_capital_contributions?: number | null
          entity_cash_distributions?: number | null
          entity_city?: string | null
          entity_ein?: string | null
          entity_ending_cash?: number | null
          entity_ending_current_liabilities?: number | null
          entity_ending_long_term_assets?: number | null
          entity_formation_date?: string | null
          entity_has_foreign_investors?: boolean
          entity_id?: string | null
          entity_name?: string | null
          entity_phone_number?: string | null
          entity_portfolio_expense?: number | null
          entity_postal_code?: string | null
          entity_satisfies_receipts_and_assets?: boolean
          entity_state?: string | null
          entity_street_address?: string | null
          entity_type?: string | null
          extension_filed?: boolean
          filing_id?: string | null
          filing_status?: string | null
          id?: string
          is_amendment_return?: boolean
          is_final_return?: boolean
          is_initial_return?: boolean
          partnership_representative_city?: string | null
          partnership_representative_designated_individual_city?: string | null
          partnership_representative_designated_individual_email?: string | null
          partnership_representative_designated_individual_first_name?:
            | string
            | null
          partnership_representative_designated_individual_last_name?:
            | string
            | null
          partnership_representative_designated_individual_phone?: string | null
          partnership_representative_designated_individual_state?: string | null
          partnership_representative_designated_individual_street_address?:
            | string
            | null
          partnership_representative_designated_individual_zip?: string | null
          partnership_representative_name?: string | null
          partnership_representative_phone?: string | null
          partnership_representative_state?: string | null
          partnership_representative_street_address?: string | null
          partnership_representative_zip?: string | null
          portfolio_expense_description?: string | null
          provider?: string | null
          provider_id?: string | null
          signer_first_name?: string | null
          signer_last_name?: string | null
          signer_signature?: string | null
          signer_signature_date?: string | null
          signer_title?: string | null
          tax_type?: string | null
          tax_year?: string | null
          updated_at?: string | null
        }
      }
      files: {
        Row: {
          content_type: string | null
          created_at: string | null
          file_name: string | null
          id: string
          key: string | null
          legacy_bucket: string | null
          legacy_key: string | null
          mongo_documents_id: string | null
          mongo_owner_id: string | null
          type: string | null
          updated_at: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          content_type?: string | null
          created_at?: string | null
          file_name?: string | null
          id?: string
          key?: string | null
          legacy_bucket?: string | null
          legacy_key?: string | null
          mongo_documents_id?: string | null
          mongo_owner_id?: string | null
          type?: string | null
          updated_at?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          content_type?: string | null
          created_at?: string | null
          file_name?: string | null
          id?: string
          key?: string | null
          legacy_bucket?: string | null
          legacy_key?: string | null
          mongo_documents_id?: string | null
          mongo_owner_id?: string | null
          type?: string | null
          updated_at?: string | null
          user_email?: string | null
          user_id?: string | null
        }
      }
      files_signatures: {
        Row: {
          date_signed: string | null
          file_id: string | null
          id: string
          ip_address: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          date_signed?: string | null
          file_id?: string | null
          id?: string
          ip_address?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          date_signed?: string | null
          file_id?: string | null
          id?: string
          ip_address?: string | null
          user_email?: string | null
          user_id?: string | null
        }
      }
      identities: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          city: string | null
          country: string | null
          created_at: string | null
          date_of_entity_formation: string | null
          entity_is_disregarded: string | null
          entity_type: string | null
          id: string
          kyb_status: string | null
          kyc_status: string | null
          legal_name: string | null
          ownership_percent: number | null
          parent_profile_id: string | null
          phone_number: string | null
          postal_code: string | null
          provider: string | null
          provider_id: string | null
          region: string | null
          tax_id: string | null
          tax_id_type: string | null
          type: string | null
          updated_at: string | null
          us_domestic: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_entity_formation?: string | null
          entity_is_disregarded?: string | null
          entity_type?: string | null
          id?: string
          kyb_status?: string | null
          kyc_status?: string | null
          legal_name?: string | null
          ownership_percent?: number | null
          parent_profile_id?: string | null
          phone_number?: string | null
          postal_code?: string | null
          provider?: string | null
          provider_id?: string | null
          region?: string | null
          tax_id?: string | null
          tax_id_type?: string | null
          type?: string | null
          updated_at?: string | null
          us_domestic?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_entity_formation?: string | null
          entity_is_disregarded?: string | null
          entity_type?: string | null
          id?: string
          kyb_status?: string | null
          kyc_status?: string | null
          legal_name?: string | null
          ownership_percent?: number | null
          parent_profile_id?: string | null
          phone_number?: string | null
          postal_code?: string | null
          provider?: string | null
          provider_id?: string | null
          region?: string | null
          tax_id?: string | null
          tax_id_type?: string | null
          type?: string | null
          updated_at?: string | null
          us_domestic?: string | null
          user_email?: string | null
          user_id?: string | null
        }
      }
      investments: {
        Row: {
          bluesky_fees: number | null
          capital_wired_amount: number | null
          carry: number | null
          complete_at: string | null
          created_at: string | null
          deal_id: string | null
          id: string
          identity: string | null
          invited_at: string | null
          is_migration: boolean | null
          ledger_matched: boolean | null
          management_fee_percent: number | null
          management_fees_dollars: number | null
          migration_deal_name: string | null
          mongo_deal_id: string | null
          mongo_investment_id: string | null
          mongo_user_id: string | null
          net_investment: number | null
          other_expenses_2022: number | null
          private_fund_expenses: number | null
          spv_fees: number | null
          status: string | null
          subscription_amount: number | null
          updated_at: string | null
          user_email: string | null
        }
        Insert: {
          bluesky_fees?: number | null
          capital_wired_amount?: number | null
          carry?: number | null
          complete_at?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: string
          identity?: string | null
          invited_at?: string | null
          is_migration?: boolean | null
          ledger_matched?: boolean | null
          management_fee_percent?: number | null
          management_fees_dollars?: number | null
          migration_deal_name?: string | null
          mongo_deal_id?: string | null
          mongo_investment_id?: string | null
          mongo_user_id?: string | null
          net_investment?: number | null
          other_expenses_2022?: number | null
          private_fund_expenses?: number | null
          spv_fees?: number | null
          status?: string | null
          subscription_amount?: number | null
          updated_at?: string | null
          user_email?: string | null
        }
        Update: {
          bluesky_fees?: number | null
          capital_wired_amount?: number | null
          carry?: number | null
          complete_at?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: string
          identity?: string | null
          invited_at?: string | null
          is_migration?: boolean | null
          ledger_matched?: boolean | null
          management_fee_percent?: number | null
          management_fees_dollars?: number | null
          migration_deal_name?: string | null
          mongo_deal_id?: string | null
          mongo_investment_id?: string | null
          mongo_user_id?: string | null
          net_investment?: number | null
          other_expenses_2022?: number | null
          private_fund_expenses?: number | null
          spv_fees?: number | null
          status?: string | null
          subscription_amount?: number | null
          updated_at?: string | null
          user_email?: string | null
        }
      }
      investments_files: {
        Row: {
          file_id: string | null
          id: string
          investment_id: string | null
        }
        Insert: {
          file_id?: string | null
          id?: string
          investment_id?: string | null
        }
        Update: {
          file_id?: string | null
          id?: string
          investment_id?: string | null
        }
      }
      investments_portfolio_value: {
        Row: {
          sum: number | null
        }
        Insert: {
          sum?: number | null
        }
        Update: {
          sum?: number | null
        }
      }
      investments_taxes: {
        Row: {
          deal_id: string | null
          entity_id: string | null
          id: string
          investment_id: string | null
          investor_beginning_capital: number | null
          investor_beginning_loss: number | null
          investor_beginning_profit: number | null
          investor_city: string | null
          investor_contributions: number | null
          investor_disregarded_owner_name: string | null
          investor_disregarded_owner_tax_id: string | null
          investor_distributions: number | null
          investor_entity_is_disregarded: boolean | null
          investor_entity_type: string | null
          investor_fc_and_soi_and_d_applicable: boolean | null
          investor_foreign_tax_credit_limitation_applicable: boolean | null
          investor_is_us_domestic: boolean | null
          investor_name: string | null
          investor_other_deductions: number | null
          investor_postal_code: string | null
          investor_state: string | null
          investor_street_address: string | null
          investor_tax_id: string | null
          tax_year: string | null
          users_investment_entities_id: string | null
          users_personal_identities_id: string | null
        }
        Insert: {
          deal_id?: string | null
          entity_id?: string | null
          id?: string
          investment_id?: string | null
          investor_beginning_capital?: number | null
          investor_beginning_loss?: number | null
          investor_beginning_profit?: number | null
          investor_city?: string | null
          investor_contributions?: number | null
          investor_disregarded_owner_name?: string | null
          investor_disregarded_owner_tax_id?: string | null
          investor_distributions?: number | null
          investor_entity_is_disregarded?: boolean | null
          investor_entity_type?: string | null
          investor_fc_and_soi_and_d_applicable?: boolean | null
          investor_foreign_tax_credit_limitation_applicable?: boolean | null
          investor_is_us_domestic?: boolean | null
          investor_name?: string | null
          investor_other_deductions?: number | null
          investor_postal_code?: string | null
          investor_state?: string | null
          investor_street_address?: string | null
          investor_tax_id?: string | null
          tax_year?: string | null
          users_investment_entities_id?: string | null
          users_personal_identities_id?: string | null
        }
        Update: {
          deal_id?: string | null
          entity_id?: string | null
          id?: string
          investment_id?: string | null
          investor_beginning_capital?: number | null
          investor_beginning_loss?: number | null
          investor_beginning_profit?: number | null
          investor_city?: string | null
          investor_contributions?: number | null
          investor_disregarded_owner_name?: string | null
          investor_disregarded_owner_tax_id?: string | null
          investor_distributions?: number | null
          investor_entity_is_disregarded?: boolean | null
          investor_entity_type?: string | null
          investor_fc_and_soi_and_d_applicable?: boolean | null
          investor_foreign_tax_credit_limitation_applicable?: boolean | null
          investor_is_us_domestic?: boolean | null
          investor_name?: string | null
          investor_other_deductions?: number | null
          investor_postal_code?: string | null
          investor_state?: string | null
          investor_street_address?: string | null
          investor_tax_id?: string | null
          tax_year?: string | null
          users_investment_entities_id?: string | null
          users_personal_identities_id?: string | null
        }
      }
      investments_total_invested: {
        Row: {
          sum: number | null
        }
        Insert: {
          sum?: number | null
        }
        Update: {
          sum?: number | null
        }
      }
      invoices: {
        Row: {
          created_at: string | null
          id: number
          migration: boolean | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          migration?: boolean | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          migration?: boolean | null
          status?: string | null
        }
      }
      migrations_uploads: {
        Row: {
          __v: string | null
          _id: string
          created_at: string | null
          migration_id: string | null
          notes: string | null
          s3_bucket: string | null
          s3_key: string | null
          title: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          __v?: string | null
          _id: string
          created_at?: string | null
          migration_id?: string | null
          notes?: string | null
          s3_bucket?: string | null
          s3_key?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          __v?: string | null
          _id?: string
          created_at?: string | null
          migration_id?: string | null
          notes?: string | null
          s3_bucket?: string | null
          s3_key?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
        }
      }
      missing_data_requests: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          notes: string | null
          status: string | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          notes?: string | null
          status?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          notes?: string | null
          status?: string | null
          type?: string | null
        }
      }
      organizations: {
        Row: {
          approved: string | null
          created_at: string | null
          high_volume_partner: boolean | null
          id: string
          is_archived: boolean | null
          legal_name: string | null
          mongo_id: string | null
          mou_signed: boolean | null
          name: string | null
          phase: string | null
          slug: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          approved?: string | null
          created_at?: string | null
          high_volume_partner?: boolean | null
          id?: string
          is_archived?: boolean | null
          legal_name?: string | null
          mongo_id?: string | null
          mou_signed?: boolean | null
          name?: string | null
          phase?: string | null
          slug?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          approved?: string | null
          created_at?: string | null
          high_volume_partner?: boolean | null
          id?: string
          is_archived?: boolean | null
          legal_name?: string | null
          mongo_id?: string | null
          mou_signed?: boolean | null
          name?: string | null
          phase?: string | null
          slug?: string | null
          status?: string | null
          updated_at?: string | null
        }
      }
      organizations_roles: {
        Row: {
          created_at: string | null
          id: string
          is_invite: boolean | null
          organization_id: string | null
          type: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_invite?: boolean | null
          organization_id?: string | null
          type?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_invite?: boolean | null
          organization_id?: string | null
          type?: string | null
          user_email?: string | null
          user_id?: string | null
        }
      }
      regd_filing: {
        Row: {
          "3(c)7": string | null
          "Accession Code": string | null
          "Advisor Report": string | null
          "Bluesky Fee Date Paid": string | null
          "Bluesky Fee Notes": string | null
          "Bluesky Fee Payment": string | null
          "Bluesky Fees Total Calculated": string | null
          "Bluesky Payment Source": string | null
          CCC: string | null
          CIK: string | null
          "Date Deal Onboarded": string | null
          "Deal Name": string | null
          deal_id: string | null
          "Draft Blue Sky Saved": string | null
          "EDGAR Accepted": string | null
          "EDGAR Form Prepared": string | null
          "EDGAR Passphrase": string | null
          "EDGAR Password": string | null
          "EDGAR Resubmission Date": string | null
          "EDGAR Resubmitted": string | null
          "EDGAR Submission Date": string | null
          "Edgar Submission Due": string | null
          "EDGAR Submitted": string | null
          "Follow On/Already Filed": string | null
          "Form D File Date": string | null
          "Form D File Number": string | null
          "Investment Advisor Name": string | null
          "Investment Recommendation": string | null
          "Late Fee": string | null
          "No Bluesky Fee Payment Required": string | null
          Notarized: string | null
          PMAC: string | null
          "Portfolio Wire Date": string | null
          "Private Fund ID Number": string | null
          "Reg D Filed": string | null
          "Reg D Opted Out": string | null
          "RegD Bluesky  Paid": string | null
          "RegD Due Date": string | null
          "RegD Opted Out": string | null
          regd_filing_id: string
          "Rejected EDGAR": string | null
          "Series Entity Name (Legal SPV/Fund Name)": string | null
        }
        Insert: {
          "3(c)7"?: string | null
          "Accession Code"?: string | null
          "Advisor Report"?: string | null
          "Bluesky Fee Date Paid"?: string | null
          "Bluesky Fee Notes"?: string | null
          "Bluesky Fee Payment"?: string | null
          "Bluesky Fees Total Calculated"?: string | null
          "Bluesky Payment Source"?: string | null
          CCC?: string | null
          CIK?: string | null
          "Date Deal Onboarded"?: string | null
          "Deal Name"?: string | null
          deal_id?: string | null
          "Draft Blue Sky Saved"?: string | null
          "EDGAR Accepted"?: string | null
          "EDGAR Form Prepared"?: string | null
          "EDGAR Passphrase"?: string | null
          "EDGAR Password"?: string | null
          "EDGAR Resubmission Date"?: string | null
          "EDGAR Resubmitted"?: string | null
          "EDGAR Submission Date"?: string | null
          "Edgar Submission Due"?: string | null
          "EDGAR Submitted"?: string | null
          "Follow On/Already Filed"?: string | null
          "Form D File Date"?: string | null
          "Form D File Number"?: string | null
          "Investment Advisor Name"?: string | null
          "Investment Recommendation"?: string | null
          "Late Fee"?: string | null
          "No Bluesky Fee Payment Required"?: string | null
          Notarized?: string | null
          PMAC?: string | null
          "Portfolio Wire Date"?: string | null
          "Private Fund ID Number"?: string | null
          "Reg D Filed"?: string | null
          "Reg D Opted Out"?: string | null
          "RegD Bluesky  Paid"?: string | null
          "RegD Due Date"?: string | null
          "RegD Opted Out"?: string | null
          regd_filing_id?: string
          "Rejected EDGAR"?: string | null
          "Series Entity Name (Legal SPV/Fund Name)"?: string | null
        }
        Update: {
          "3(c)7"?: string | null
          "Accession Code"?: string | null
          "Advisor Report"?: string | null
          "Bluesky Fee Date Paid"?: string | null
          "Bluesky Fee Notes"?: string | null
          "Bluesky Fee Payment"?: string | null
          "Bluesky Fees Total Calculated"?: string | null
          "Bluesky Payment Source"?: string | null
          CCC?: string | null
          CIK?: string | null
          "Date Deal Onboarded"?: string | null
          "Deal Name"?: string | null
          deal_id?: string | null
          "Draft Blue Sky Saved"?: string | null
          "EDGAR Accepted"?: string | null
          "EDGAR Form Prepared"?: string | null
          "EDGAR Passphrase"?: string | null
          "EDGAR Password"?: string | null
          "EDGAR Resubmission Date"?: string | null
          "EDGAR Resubmitted"?: string | null
          "EDGAR Submission Date"?: string | null
          "Edgar Submission Due"?: string | null
          "EDGAR Submitted"?: string | null
          "Follow On/Already Filed"?: string | null
          "Form D File Date"?: string | null
          "Form D File Number"?: string | null
          "Investment Advisor Name"?: string | null
          "Investment Recommendation"?: string | null
          "Late Fee"?: string | null
          "No Bluesky Fee Payment Required"?: string | null
          Notarized?: string | null
          PMAC?: string | null
          "Portfolio Wire Date"?: string | null
          "Private Fund ID Number"?: string | null
          "Reg D Filed"?: string | null
          "Reg D Opted Out"?: string | null
          "RegD Bluesky  Paid"?: string | null
          "RegD Due Date"?: string | null
          "RegD Opted Out"?: string | null
          regd_filing_id?: string
          "Rejected EDGAR"?: string | null
          "Series Entity Name (Legal SPV/Fund Name)"?: string | null
        }
      }
      shortcodes: {
        Row: {
          code: string | null
          created_at: string | null
          id: string
          url: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          id?: string
          url?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          id?: string
          url?: string | null
        }
      }
      "status-discrepancies": {
        Row: {
          name: string | null
          new_id: string | null
          new_status: string | null
          old_id: string | null
          old_status: string | null
        }
        Insert: {
          name?: string | null
          new_id?: string | null
          new_status?: string | null
          old_id?: string | null
          old_status?: string | null
        }
        Update: {
          name?: string | null
          new_id?: string | null
          new_status?: string | null
          old_id?: string | null
          old_status?: string | null
        }
      }
      tax_k1s: {
        Row: {
          __v: string | null
          _id: string
          address: string | null
          "allAirtableData.ledger": Json | null
          beginning_capital: string | null
          beginning_loss: string | null
          beginning_profit: string | null
          city: string | null
          contributions: string | null
          country: string | null
          createdAt: string | null
          disregarded_entity: string | null
          distributions: string | null
          email: string | null
          ending_capital: string | null
          ending_loss: string | null
          ending_profit: string | null
          "file.bucket": string | null
          "file.key": string | null
          foreign_entity: boolean | null
          investing_as: string | null
          investor_name: string | null
          "metadata.airtable_record_id": string | null
          "metadata.dashboard_display": string | null
          "metadata.need_tax_form": string | null
          name: string | null
          name_line_2: string | null
          postal_code: string | null
          state: string | null
          tax_class: string | null
          tax_id: string | null
          tax_return: string | null
          tax_year: string | null
          type: string | null
          updatedAt: string | null
        }
        Insert: {
          __v?: string | null
          _id: string
          address?: string | null
          "allAirtableData.ledger"?: Json | null
          beginning_capital?: string | null
          beginning_loss?: string | null
          beginning_profit?: string | null
          city?: string | null
          contributions?: string | null
          country?: string | null
          createdAt?: string | null
          disregarded_entity?: string | null
          distributions?: string | null
          email?: string | null
          ending_capital?: string | null
          ending_loss?: string | null
          ending_profit?: string | null
          "file.bucket"?: string | null
          "file.key"?: string | null
          foreign_entity?: boolean | null
          investing_as?: string | null
          investor_name?: string | null
          "metadata.airtable_record_id"?: string | null
          "metadata.dashboard_display"?: string | null
          "metadata.need_tax_form"?: string | null
          name?: string | null
          name_line_2?: string | null
          postal_code?: string | null
          state?: string | null
          tax_class?: string | null
          tax_id?: string | null
          tax_return?: string | null
          tax_year?: string | null
          type?: string | null
          updatedAt?: string | null
        }
        Update: {
          __v?: string | null
          _id?: string
          address?: string | null
          "allAirtableData.ledger"?: Json | null
          beginning_capital?: string | null
          beginning_loss?: string | null
          beginning_profit?: string | null
          city?: string | null
          contributions?: string | null
          country?: string | null
          createdAt?: string | null
          disregarded_entity?: string | null
          distributions?: string | null
          email?: string | null
          ending_capital?: string | null
          ending_loss?: string | null
          ending_profit?: string | null
          "file.bucket"?: string | null
          "file.key"?: string | null
          foreign_entity?: boolean | null
          investing_as?: string | null
          investor_name?: string | null
          "metadata.airtable_record_id"?: string | null
          "metadata.dashboard_display"?: string | null
          "metadata.need_tax_form"?: string | null
          name?: string | null
          name_line_2?: string | null
          postal_code?: string | null
          state?: string | null
          tax_class?: string | null
          tax_id?: string | null
          tax_return?: string | null
          tax_year?: string | null
          type?: string | null
          updatedAt?: string | null
        }
      }
      tax_w8w9s: {
        Row: {
          __v: string | null
          _id: string
          created_at: string | null
          passport_id: string | null
          tax_form_address: string | null
          tax_form_city: string | null
          tax_form_id: string | null
          tax_form_postal_code: string | null
          tax_form_state: string | null
          tax_form_tax_id: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          __v?: string | null
          _id: string
          created_at?: string | null
          passport_id?: string | null
          tax_form_address?: string | null
          tax_form_city?: string | null
          tax_form_id?: string | null
          tax_form_postal_code?: string | null
          tax_form_state?: string | null
          tax_form_tax_id?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          __v?: string | null
          _id?: string
          created_at?: string | null
          passport_id?: string | null
          tax_form_address?: string | null
          tax_form_city?: string | null
          tax_form_id?: string | null
          tax_form_postal_code?: string | null
          tax_form_state?: string | null
          tax_form_tax_id?: string | null
          type?: string | null
          updated_at?: string | null
        }
      }
      temporary: {
        Row: {
          _id: string
          slug: string | null
        }
        Insert: {
          _id: string
          slug?: string | null
        }
        Update: {
          _id?: string
          slug?: string | null
        }
      }
      total_funds_count: {
        Row: {
          count: number | null
        }
        Insert: {
          count?: number | null
        }
        Update: {
          count?: number | null
        }
      }
      total_investors: {
        Row: {
          count: number | null
        }
        Insert: {
          count?: number | null
        }
        Update: {
          count?: number | null
        }
      }
      total_investors_count: {
        Row: {
          count: number | null
        }
        Insert: {
          count?: number | null
        }
        Update: {
          count?: number | null
        }
      }
      total_migrations_count: {
        Row: {
          count: number | null
        }
        Insert: {
          count?: number | null
        }
        Update: {
          count?: number | null
        }
      }
      total_spvs_count: {
        Row: {
          count: number | null
        }
        Insert: {
          count?: number | null
        }
        Update: {
          count?: number | null
        }
      }
      transactions: {
        Row: {
          amount: number | null
          bank_account_id: string | null
          created_at: string | null
          deal_id: string | null
          description: string | null
          destination_account_id: string | null
          direction: string | null
          entity_id: string | null
          id: string
          investment_id: string | null
          legacy_airtable_id: string | null
          mongo_deal_id: string | null
          mongo_investment_id: string | null
          mongo_user_id: string | null
          organization_id: string | null
          organization_name: string | null
          plaid_account_id: string | null
          plaid_transaction_id: string | null
          provider: string | null
          provider_account_id: string | null
          provider_id: string | null
          source_account_id: string | null
          status: string | null
          user_email: string | null
        }
        Insert: {
          amount?: number | null
          bank_account_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          description?: string | null
          destination_account_id?: string | null
          direction?: string | null
          entity_id?: string | null
          id?: string
          investment_id?: string | null
          legacy_airtable_id?: string | null
          mongo_deal_id?: string | null
          mongo_investment_id?: string | null
          mongo_user_id?: string | null
          organization_id?: string | null
          organization_name?: string | null
          plaid_account_id?: string | null
          plaid_transaction_id?: string | null
          provider?: string | null
          provider_account_id?: string | null
          provider_id?: string | null
          source_account_id?: string | null
          status?: string | null
          user_email?: string | null
        }
        Update: {
          amount?: number | null
          bank_account_id?: string | null
          created_at?: string | null
          deal_id?: string | null
          description?: string | null
          destination_account_id?: string | null
          direction?: string | null
          entity_id?: string | null
          id?: string
          investment_id?: string | null
          legacy_airtable_id?: string | null
          mongo_deal_id?: string | null
          mongo_investment_id?: string | null
          mongo_user_id?: string | null
          organization_id?: string | null
          organization_name?: string | null
          plaid_account_id?: string | null
          plaid_transaction_id?: string | null
          provider?: string | null
          provider_account_id?: string | null
          provider_id?: string | null
          source_account_id?: string | null
          status?: string | null
          user_email?: string | null
        }
      }
      transactions_bank_accounts: {
        Row: {
          account_number: string | null
          bank_account_name: string | null
          bank_name: string | null
          created_at: string | null
          currency_type: string | null
          entity_id: string | null
          id: string
          new: boolean | null
          organization: string | null
          organization_id: string | null
          plaid_account_id: string | null
          provider: string | null
          provider_id: string | null
          routing_number: string | null
          updated_at: string | null
          user_email: string | null
        }
        Insert: {
          account_number?: string | null
          bank_account_name?: string | null
          bank_name?: string | null
          created_at?: string | null
          currency_type?: string | null
          entity_id?: string | null
          id?: string
          new?: boolean | null
          organization?: string | null
          organization_id?: string | null
          plaid_account_id?: string | null
          provider?: string | null
          provider_id?: string | null
          routing_number?: string | null
          updated_at?: string | null
          user_email?: string | null
        }
        Update: {
          account_number?: string | null
          bank_account_name?: string | null
          bank_name?: string | null
          created_at?: string | null
          currency_type?: string | null
          entity_id?: string | null
          id?: string
          new?: boolean | null
          organization?: string | null
          organization_id?: string | null
          plaid_account_id?: string | null
          provider?: string | null
          provider_id?: string | null
          routing_number?: string | null
          updated_at?: string | null
          user_email?: string | null
        }
      }
      users: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string | null
          investor_type: string | null
          is_migration: boolean | null
          is_super_admin: boolean
          last_name: string | null
          mongo_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id?: string | null
          investor_type?: string | null
          is_migration?: boolean | null
          is_super_admin?: boolean
          last_name?: string | null
          mongo_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string | null
          investor_type?: string | null
          is_migration?: boolean | null
          is_super_admin?: boolean
          last_name?: string | null
          mongo_id?: string | null
          updated_at?: string
        }
      }
      users_investment_entities: {
        Row: {
          address: string | null
          country: string | null
          created_at: string
          created_date: string | null
          id: string
          mongo_user_id: string | null
          name: string | null
          phone: string | null
          state: string | null
          tax_id: string | null
          type: string | null
          user_email: string | null
          value: string | null
        }
        Insert: {
          address?: string | null
          country?: string | null
          created_at?: string
          created_date?: string | null
          id?: string
          mongo_user_id?: string | null
          name?: string | null
          phone?: string | null
          state?: string | null
          tax_id?: string | null
          type?: string | null
          user_email?: string | null
          value?: string | null
        }
        Update: {
          address?: string | null
          country?: string | null
          created_at?: string
          created_date?: string | null
          id?: string
          mongo_user_id?: string | null
          name?: string | null
          phone?: string | null
          state?: string | null
          tax_id?: string | null
          type?: string | null
          user_email?: string | null
          value?: string | null
        }
      }
      users_personal_identities: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          city: string | null
          country: string | null
          created_at: string
          id: string
          legal_name: string | null
          phone_number: string | null
          postal_code: string | null
          provider: string | null
          provider_id: string | null
          region: string | null
          status: string | null
          tax_id: string | null
          tax_id_type: string | null
          type: string | null
          updated_at: string
          user_email: string | null
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          legal_name?: string | null
          phone_number?: string | null
          postal_code?: string | null
          provider?: string | null
          provider_id?: string | null
          region?: string | null
          status?: string | null
          tax_id?: string | null
          tax_id_type?: string | null
          type?: string | null
          updated_at?: string
          user_email?: string | null
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          legal_name?: string | null
          phone_number?: string | null
          postal_code?: string | null
          provider?: string | null
          provider_id?: string | null
          region?: string | null
          status?: string | null
          tax_id?: string | null
          tax_id_type?: string | null
          type?: string | null
          updated_at?: string
          user_email?: string | null
        }
      }
    }
    Views: {
      investments_missing_data: {
        Row: {
          bluesky_fees: number | null
          capital_wired_amount: number | null
          carry: number | null
          deal_name: string | null
          email: string | null
          entity_name: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          management_fee_percent: number | null
          management_fees_dollars: number | null
          net_investment: number | null
          organization_name: string | null
          other_expenses_2022: number | null
          private_fund_expenses: number | null
          spv_fees: number | null
          subscription_amount: number | null
        }
      }
      limited_investments: {
        Row: {
          bluesky_fees: number | null
          capital_wired_amount: number | null
          carry: number | null
          complete_at: string | null
          created_at: string | null
          deal_id: string | null
          deal_name: string | null
          id: string | null
          invited_at: string | null
          is_migration: boolean | null
          ledger_matched: boolean | null
          management_fee_percent: number | null
          management_fees_dollars: number | null
          mongo_deal_id: string | null
          mongo_investment_id: string | null
          mongo_user_id: string | null
          net_investment: number | null
          other_expenses_2022: number | null
          private_fund_expenses: number | null
          spv_fees: number | null
          status: string | null
          subscription_amount: number | null
          updated_at: string | null
          user_email: string | null
        }
      }
      limited_organizations: {
        Row: {
          approved: string | null
          created_at: string | null
          high_volume_partner: boolean | null
          id: string | null
          legal_name: string | null
          mongo_id: string | null
          mou_signed: boolean | null
          name: string | null
          phase: string | null
          slug: string | null
          status: string | null
          updated_at: string | null
        }
      }
      private_deals: {
        Row: {
          accept_crypto: boolean | null
          advisor_type: string | null
          asset_id: string | null
          bank_account_id: string | null
          banking_provider: string | null
          closing_date: string | null
          created_at: string | null
          deal_term: string | null
          documents_provider: string | null
          documents_template_id: string | null
          entity_id: string | null
          entity_name: string | null
          estimated_multiple: number | null
          id: string | null
          international_investors: boolean | null
          is_migration: boolean | null
          legacy_company_name: string | null
          legal_template_option: string | null
          management_fee_frequency: string | null
          management_fee_percent: number | null
          master_series: string | null
          minimum_investment: number | null
          mongo_deal_id: string | null
          mongo_organization_id: string | null
          name: string | null
          offering_type: string | null
          onboarding_link: string | null
          organization_id: string | null
          series_name: string | null
          status: string | null
          sub_type: string | null
          total_carry: number | null
          total_raised_amount: number | null
          type: string | null
          updated_at: string | null
          user_email: string | null
        }
      }
      public_deals: {
        Row: {
          closing_date: string | null
          id: string | null
          management_fee_frequency: string | null
          management_fee_percent: number | null
          memo: string | null
          minimum_investment: number | null
          name: string | null
          offering_type: string | null
          status: string | null
        }
        Insert: {
          closing_date?: string | null
          id?: string | null
          management_fee_frequency?: string | null
          management_fee_percent?: number | null
          memo?: string | null
          minimum_investment?: number | null
          name?: string | null
          offering_type?: string | null
          status?: string | null
        }
        Update: {
          closing_date?: string | null
          id?: string | null
          management_fee_frequency?: string | null
          management_fee_percent?: number | null
          memo?: string | null
          minimum_investment?: number | null
          name?: string | null
          offering_type?: string | null
          status?: string | null
        }
      }
      total_deals: {
        Row: {
          approved: string | null
          created_at: string | null
          deal_count: number | null
          high_volume_partner: boolean | null
          id: string | null
          is_archived: boolean | null
          legal_name: string | null
          mongo_id: string | null
          mou_signed: boolean | null
          name: string | null
          phase: string | null
          slug: string | null
          status: string | null
          updated_at: string | null
        }
      }
    }
    Functions: {
      current_user_id_match: {
        Args: {
          match: string
        }
        Returns: boolean
      }
      deals_count_user_email: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      funds_estimated_multiple: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      funds_total_aum: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      funds_total_funds: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      funds_total_investors: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      funds_total_raised: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      generate_shortcode: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_deal_raise_amount: {
        Args: {
          deal_id: string
        }
        Returns: number
      }
      hydrate_deal_shortlinks: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      investments_estimated_multiple: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      investments_portfolio_value: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      investments_total_invested: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_fund_manager: {
        Args: {
          organization_id: string
        }
        Returns: boolean
      }
      metrics_estimated_multiple: {
        Args: {
          organizationid: string
        }
        Returns: number
      }
      metrics_totalaum: {
        Args: {
          organizationid: number
        }
        Returns: number
      }
      spvs_estimated_multiple: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      spvs_total_aum: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      spvs_total_investors: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      spvs_total_raised: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      spvs_total_spvs: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      total_funds_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      total_investments_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      total_investors_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      total_migrations_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      total_spvs_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
