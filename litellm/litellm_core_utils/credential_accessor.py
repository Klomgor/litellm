"""Utils for accessing credentials."""

from typing import List, Union

from pydantic import BaseModel

import litellm
from litellm.types.utils import CredentialItem


class CredentialAccessor:
    @staticmethod
    def get_credential_values(credential_name: str) -> dict:
        """Safe accessor for credentials."""
        if not litellm.credential_list:
            return {}
        for credential in litellm.credential_list:
            if credential.credential_name == credential_name:
                return credential.credential_values.copy()
        return {}

    @staticmethod
    def upsert_credentials(credentials: List[CredentialItem]):
        """Add a credential to the list of credentials."""

        for credential in credentials:
            if credential.credential_name in litellm.credential_list:
                # Find and replace the existing credential in the list
                for i, existing_cred in enumerate(litellm.credential_list):
                    if existing_cred.credential_name == credential.credential_name:
                        litellm.credential_list[i] = credential
                        break
            else:
                litellm.credential_list.append(credential)
