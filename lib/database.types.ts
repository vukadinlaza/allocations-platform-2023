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
      _organization_roles: {
        Row: {
          _id: string
          created_at: string | null
          organization_id: string | null
          passport_id: string | null
          type: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          _id: string
          created_at?: string | null
          organization_id?: string | null
          passport_id?: string | null
          type?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          _id?: string
          created_at?: string | null
          organization_id?: string | null
          passport_id?: string | null
          type?: string | null
          user_email?: string | null
          user_id?: string | null
        }
      }
      accreditations: {
        Row: {
          accreditation_doc_url: string | null
          accreditation_status: string | null
          created_at: string | null
          id: string
        }
        Insert: {
          accreditation_doc_url?: string | null
          accreditation_status?: string | null
          created_at?: string | null
          id?: string
        }
        Update: {
          accreditation_doc_url?: string | null
          accreditation_status?: string | null
          created_at?: string | null
          id?: string
        }
      }
      deals: {
        Row: {
          accept_crypto: boolean | null
          asset_type: string | null
          carry_fee: string | null
          closed: boolean | null
          closing_date: string | null
          company_name: string | null
          created_at: string | null
          deal_term: string | null
          documents: string | null
          elevated_returns: boolean | null
          entity_id: string | null
          entity_name: string | null
          id: string
          international_investors: boolean | null
          invited_investors: string | null
          legacy_manager_email: string | null
          legacy_manager_name: string | null
          legacy_organization_name: string | null
          management_fee: string | null
          management_fee_dollar: string | null
          management_fee_frequency: string | null
          management_fee_percent: string | null
          management_fee_type: string | null
          manager_email: string | null
          manager_type: string | null
          minimum_investment: string | null
          mongo_id: string | null
          mongo_organization_id: string | null
          name: string | null
          offering_type: string | null
          onboarding_link: string | null
          organization_id: string | null
          owner_mongo_id: string | null
          portfolio_company_name: string | null
          series_name: string | null
          setup_cost: string | null
          side_letters: boolean | null
          sign_deadline: string | null
          status: string | null
          target: string | null
          target_raise_goal: string | null
          total_carry: string | null
          total_round_size: string | null
          type: string | null
          updated_at: string | null
          user_email: string | null
          wire_deadline: string | null
        }
        Insert: {
          accept_crypto?: boolean | null
          asset_type?: string | null
          carry_fee?: string | null
          closed?: boolean | null
          closing_date?: string | null
          company_name?: string | null
          created_at?: string | null
          deal_term?: string | null
          documents?: string | null
          elevated_returns?: boolean | null
          entity_id?: string | null
          entity_name?: string | null
          id?: string
          international_investors?: boolean | null
          invited_investors?: string | null
          legacy_manager_email?: string | null
          legacy_manager_name?: string | null
          legacy_organization_name?: string | null
          management_fee?: string | null
          management_fee_dollar?: string | null
          management_fee_frequency?: string | null
          management_fee_percent?: string | null
          management_fee_type?: string | null
          manager_email?: string | null
          manager_type?: string | null
          minimum_investment?: string | null
          mongo_id?: string | null
          mongo_organization_id?: string | null
          name?: string | null
          offering_type?: string | null
          onboarding_link?: string | null
          organization_id?: string | null
          owner_mongo_id?: string | null
          portfolio_company_name?: string | null
          series_name?: string | null
          setup_cost?: string | null
          side_letters?: boolean | null
          sign_deadline?: string | null
          status?: string | null
          target?: string | null
          target_raise_goal?: string | null
          total_carry?: string | null
          total_round_size?: string | null
          type?: string | null
          updated_at?: string | null
          user_email?: string | null
          wire_deadline?: string | null
        }
        Update: {
          accept_crypto?: boolean | null
          asset_type?: string | null
          carry_fee?: string | null
          closed?: boolean | null
          closing_date?: string | null
          company_name?: string | null
          created_at?: string | null
          deal_term?: string | null
          documents?: string | null
          elevated_returns?: boolean | null
          entity_id?: string | null
          entity_name?: string | null
          id?: string
          international_investors?: boolean | null
          invited_investors?: string | null
          legacy_manager_email?: string | null
          legacy_manager_name?: string | null
          legacy_organization_name?: string | null
          management_fee?: string | null
          management_fee_dollar?: string | null
          management_fee_frequency?: string | null
          management_fee_percent?: string | null
          management_fee_type?: string | null
          manager_email?: string | null
          manager_type?: string | null
          minimum_investment?: string | null
          mongo_id?: string | null
          mongo_organization_id?: string | null
          name?: string | null
          offering_type?: string | null
          onboarding_link?: string | null
          organization_id?: string | null
          owner_mongo_id?: string | null
          portfolio_company_name?: string | null
          series_name?: string | null
          setup_cost?: string | null
          side_letters?: boolean | null
          sign_deadline?: string | null
          status?: string | null
          target?: string | null
          target_raise_goal?: string | null
          total_carry?: string | null
          total_round_size?: string | null
          type?: string | null
          updated_at?: string | null
          user_email?: string | null
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
      identities: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          city: string | null
          country: string | null
          created_at: string | null
          entity_is_disregarded: boolean | null
          entity_type: string | null
          entity_us_domestic: boolean | null
          id: string
          identity_type: string | null
          legal_name: string | null
          ownership_percent: number | null
          parent_identity_id: string | null
          postal_code: string | null
          provider: string | null
          provider_id: string | null
          region: string | null
          tax_id: string | null
          tax_id_type: string | null
          type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          entity_is_disregarded?: boolean | null
          entity_type?: string | null
          entity_us_domestic?: boolean | null
          id?: string
          identity_type?: string | null
          legal_name?: string | null
          ownership_percent?: number | null
          parent_identity_id?: string | null
          postal_code?: string | null
          provider?: string | null
          provider_id?: string | null
          region?: string | null
          tax_id?: string | null
          tax_id_type?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          entity_is_disregarded?: boolean | null
          entity_type?: string | null
          entity_us_domestic?: boolean | null
          id?: string
          identity_type?: string | null
          legal_name?: string | null
          ownership_percent?: number | null
          parent_identity_id?: string | null
          postal_code?: string | null
          provider?: string | null
          provider_id?: string | null
          region?: string | null
          tax_id?: string | null
          tax_id_type?: string | null
          type?: string | null
          updated_at?: string | null
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
          invited_at: string | null
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
        Insert: {
          bluesky_fees?: number | null
          capital_wired_amount?: number | null
          carry?: number | null
          complete_at?: string | null
          created_at?: string | null
          deal_id?: string | null
          id?: string
          invited_at?: string | null
          ledger_matched?: boolean | null
          management_fee_percent?: number | null
          management_fees_dollars?: number | null
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
          invited_at?: string | null
          ledger_matched?: boolean | null
          management_fee_percent?: number | null
          management_fees_dollars?: number | null
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
      migrations: {
        Row: {
          ein: string | null
          id: string
          legal_entity_id: string | null
          manager_name: string | null
          name: string | null
          organization_id: string | null
          organization_id_new: string
          organization_name: string | null
          started_at: string
          status: string | null
        }
        Insert: {
          ein?: string | null
          id?: string
          legal_entity_id?: string | null
          manager_name?: string | null
          name?: string | null
          organization_id?: string | null
          organization_id_new?: string
          organization_name?: string | null
          started_at?: string
          status?: string | null
        }
        Update: {
          ein?: string | null
          id?: string
          legal_entity_id?: string | null
          manager_name?: string | null
          name?: string | null
          organization_id?: string | null
          organization_id_new?: string
          organization_name?: string | null
          started_at?: string
          status?: string | null
        }
      }
      migrations_test_old: {
        Row: {
          __v: string | null
          _id: string
          bucket: string | null
          createdAt: string | null
          deal_id: string | null
          fund_manager_email: string | null
          organization_id: string | null
          path: string | null
          status: string | null
          updatedAt: string | null
        }
        Insert: {
          __v?: string | null
          _id: string
          bucket?: string | null
          createdAt?: string | null
          deal_id?: string | null
          fund_manager_email?: string | null
          organization_id?: string | null
          path?: string | null
          status?: string | null
          updatedAt?: string | null
        }
        Update: {
          __v?: string | null
          _id?: string
          bucket?: string | null
          createdAt?: string | null
          deal_id?: string | null
          fund_manager_email?: string | null
          organization_id?: string | null
          path?: string | null
          status?: string | null
          updatedAt?: string | null
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
      organizations: {
        Row: {
          approved: string | null
          created_at: string | null
          high_volume_partner: boolean | null
          id: string
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
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_invite?: boolean | null
          organization_id?: string | null
          type?: string | null
          user_email?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_invite?: boolean | null
          organization_id?: string | null
          type?: string | null
          user_email?: string | null
        }
      }
      tax_1065s: {
        Row: {
          __v: string | null
          _id: string
          "allAirtableData.entity": Json | null
          amended_return: string | null
          assets: string | null
          "authorization_file.bucket": string | null
          "authorization_file.key": string | null
          cash: string | null
          createdAt: string | null
          deal_name: string | null
          distribution: string | null
          distribution_date: string | null
          "entity.address": string | null
          "entity.city": string | null
          "entity.ein": string | null
          "entity.formation_date": string | null
          "entity.name": string | null
          "entity.phone_number": string | null
          "entity.state": string | null
          "entity.type": string | null
          equity: string | null
          "file.bucket": string | null
          "file.key": string | null
          initial_return: string | null
          investment_description: string | null
          last_year_assets: string | null
          last_year_cash: string | null
          last_year_liabilities: string | null
          liabilities: string | null
          liabilities_description: string | null
          manager_address: string | null
          manager_city: string | null
          manager_email: string | null
          manager_name: string | null
          manager_phone_number: string | null
          manager_postal_code: string | null
          manager_state: string | null
          "metadata.airtable_record_id": string | null
          "metadata.docspring_template_id": string | null
          "metadata.gosystem_return_id": string | null
          "metadata.organization_id": string | null
          phase: string | null
          portfolio_expense: string | null
          portfolio_expense_description: string | null
          provider: string | null
          "signed_authorization_file.bucket": string | null
          "signed_authorization_file.key": string | null
          signer_first_name: string | null
          signer_last_name: string | null
          signer_title: string | null
          tax_type: number | null
          tax_year: number | null
          "taxpayer_return_file.bucket": string | null
          "taxpayer_return_file.key": string | null
          total_contributions: string | null
          updatedAt: string | null
        }
        Insert: {
          __v?: string | null
          _id: string
          "allAirtableData.entity"?: Json | null
          amended_return?: string | null
          assets?: string | null
          "authorization_file.bucket"?: string | null
          "authorization_file.key"?: string | null
          cash?: string | null
          createdAt?: string | null
          deal_name?: string | null
          distribution?: string | null
          distribution_date?: string | null
          "entity.address"?: string | null
          "entity.city"?: string | null
          "entity.ein"?: string | null
          "entity.formation_date"?: string | null
          "entity.name"?: string | null
          "entity.phone_number"?: string | null
          "entity.state"?: string | null
          "entity.type"?: string | null
          equity?: string | null
          "file.bucket"?: string | null
          "file.key"?: string | null
          initial_return?: string | null
          investment_description?: string | null
          last_year_assets?: string | null
          last_year_cash?: string | null
          last_year_liabilities?: string | null
          liabilities?: string | null
          liabilities_description?: string | null
          manager_address?: string | null
          manager_city?: string | null
          manager_email?: string | null
          manager_name?: string | null
          manager_phone_number?: string | null
          manager_postal_code?: string | null
          manager_state?: string | null
          "metadata.airtable_record_id"?: string | null
          "metadata.docspring_template_id"?: string | null
          "metadata.gosystem_return_id"?: string | null
          "metadata.organization_id"?: string | null
          phase?: string | null
          portfolio_expense?: string | null
          portfolio_expense_description?: string | null
          provider?: string | null
          "signed_authorization_file.bucket"?: string | null
          "signed_authorization_file.key"?: string | null
          signer_first_name?: string | null
          signer_last_name?: string | null
          signer_title?: string | null
          tax_type?: number | null
          tax_year?: number | null
          "taxpayer_return_file.bucket"?: string | null
          "taxpayer_return_file.key"?: string | null
          total_contributions?: string | null
          updatedAt?: string | null
        }
        Update: {
          __v?: string | null
          _id?: string
          "allAirtableData.entity"?: Json | null
          amended_return?: string | null
          assets?: string | null
          "authorization_file.bucket"?: string | null
          "authorization_file.key"?: string | null
          cash?: string | null
          createdAt?: string | null
          deal_name?: string | null
          distribution?: string | null
          distribution_date?: string | null
          "entity.address"?: string | null
          "entity.city"?: string | null
          "entity.ein"?: string | null
          "entity.formation_date"?: string | null
          "entity.name"?: string | null
          "entity.phone_number"?: string | null
          "entity.state"?: string | null
          "entity.type"?: string | null
          equity?: string | null
          "file.bucket"?: string | null
          "file.key"?: string | null
          initial_return?: string | null
          investment_description?: string | null
          last_year_assets?: string | null
          last_year_cash?: string | null
          last_year_liabilities?: string | null
          liabilities?: string | null
          liabilities_description?: string | null
          manager_address?: string | null
          manager_city?: string | null
          manager_email?: string | null
          manager_name?: string | null
          manager_phone_number?: string | null
          manager_postal_code?: string | null
          manager_state?: string | null
          "metadata.airtable_record_id"?: string | null
          "metadata.docspring_template_id"?: string | null
          "metadata.gosystem_return_id"?: string | null
          "metadata.organization_id"?: string | null
          phase?: string | null
          portfolio_expense?: string | null
          portfolio_expense_description?: string | null
          provider?: string | null
          "signed_authorization_file.bucket"?: string | null
          "signed_authorization_file.key"?: string | null
          signer_first_name?: string | null
          signer_last_name?: string | null
          signer_title?: string | null
          tax_type?: number | null
          tax_year?: number | null
          "taxpayer_return_file.bucket"?: string | null
          "taxpayer_return_file.key"?: string | null
          total_contributions?: string | null
          updatedAt?: string | null
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
      users: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string | null
          investor_type: string | null
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
          is_super_admin?: boolean
          last_name?: string | null
          mongo_id?: string | null
          updated_at?: string
        }
      }
      users_accreditations: {
        Row: {
          accreditation_id: string | null
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          accreditation_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          accreditation_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_total_investments: {
        Args: Record<PropertyKey, never>
        Returns: number
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
      metrics_totalinvestors: {
        Args: {
          organizationid: string
        }
        Returns: number
      }
      metrics_totalprivatefunds: {
        Args: {
          organizationid?: number
        }
        Returns: number
      }
      metrics_totalraised: {
        Args: {
          organizationid: string
        }
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
